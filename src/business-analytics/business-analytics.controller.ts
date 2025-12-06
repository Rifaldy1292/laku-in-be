import { Controller, Get, Query } from '@nestjs/common';
import { BusinessAnalyticsService } from './business-analytics.service';

@Controller('business-analytics')
export class BusinessAnalyticsController {
  constructor(
    private readonly businessAnalyticsService: BusinessAnalyticsService,
  ) {}

  /**
   * GET /business-analytics/summary
   * Query:
   * - phone: nomor WA yang sedang terhubung
   * - limit: jumlah pesan maksimal (default 3000)
   * - days: rentang hari (default 7)
   */
  @Get('summary')
  async getChatSummary(
    @Query('phone') phone: string,
    @Query('limit') limit?: string,
    @Query('days') days?: string,
  ) {
    if (!phone) {
      return {
        status: false,
        message: 'Parameter ?phone wajib diisi',
      };
    }

    const maxMessages = limit ? Number(limit) : 3000;
    const rangeDays = days ? Number(days) : 7;

    return this.businessAnalyticsService.generateSummary({
      phone,
      maxMessages,
      rangeDays,
    });
  }
}
