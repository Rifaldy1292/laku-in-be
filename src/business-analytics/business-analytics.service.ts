import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenAI } from 'openai';

@Injectable()
export class BusinessAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}
  private openaiClient = new OpenAI({
    apiKey: process.env.KOLOSAL_API_KEY,
    baseURL: 'https://api.kolosal.ai/v1',
  });

  /**
   * Generate summary dari database WA
   */
  async generateSummary(params: {
    phone: string;
    maxMessages: number;
    rangeDays: number;
  }) {
    const { phone, maxMessages, rangeDays } = params;

    // Hitung tanggal minimum
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - rangeDays);

    // Ambil chat dari DB
    const chatMessages = await this.prisma.watsapp_message.findMany({
      where: {
        OR: [{ from: phone }, { to: phone }],
        timestamp: { gte: startDate },
      },
      orderBy: { timestamp: 'desc' },
      take: maxMessages,
    });

    if (chatMessages.length === 0) {
      return {
        status: false,
        message: 'Tidak ada pesan dalam periode ini.',
      };
    }

    // Urutkan ascending
    const orderedMessages = chatMessages.reverse();

    // Pecah batch 3000
    const batchSize = 3000;
    const batches: (typeof orderedMessages)[number][][] = [];

    for (
      let position = 0;
      position < orderedMessages.length;
      position += batchSize
    ) {
      const slice = orderedMessages.slice(position, position + batchSize);
      batches.push(slice);
    }

    const summaries: string[] = [];

    // Kirim tiap batch ke AI
    for (const messageBatch of batches) {
      const formattedMessages = messageBatch
        .map((msg) => `[${msg.direction}] ${msg.from}: ${msg.text}`)
        .join('\n');

      const aiResponse = await this.requestSummaryFromAI(formattedMessages);
      summaries.push(aiResponse);
    }

    // Gabungkan semua batch jadi satu summary final
    const finalSummary = await this.requestSummaryFromAI(
      summaries.join('\n\n---SUMMARY PART---\n\n'),
    );

    return {
      status: true,
      messageCount: chatMessages.length,
      batchCount: batches.length,
      summary: finalSummary,
    };
  }

  /**
   * Handler panggilan AI
   */
  async requestSummaryFromAI(textBlock: string) {
    const response = await this.openaiClient.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content:
            'Ringkas isi chat WhatsApp ini. Fokus pada aktivitas bisnis, pertanyaan pelanggan, keluhan, dan peluang penjualan.',
        },
        {
          role: 'user',
          content: textBlock,
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message?.content ?? '-';
  }
}
