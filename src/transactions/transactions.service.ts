import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data: {
        item_name: createTransactionDto.item_name,
        quantity: createTransactionDto.quantity,
        unit_price: createTransactionDto.unit_price,
        subtotal:
          createTransactionDto.unit_price * createTransactionDto.quantity,
        sale_date: createTransactionDto.sale_date,
      },
    });
  }

  async findAll() {
    return this.prisma.transactions.findMany({
      orderBy: { sale_date: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.transactions.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const updatedData: any = { ...updateTransactionDto };
    if (updateTransactionDto.unit_price && updateTransactionDto.quantity) {
      updatedData.subtotal =
        updateTransactionDto.unit_price * updateTransactionDto.quantity;
    }
    return this.prisma.transactions.update({
      where: { id },
      data: updatedData,
    });
  }

  async remove(id: number) {
    return this.prisma.transactions.delete({
      where: { id },
    });
  }
}
