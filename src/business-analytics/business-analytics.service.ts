import { Injectable } from '@nestjs/common';
import { CreateBusinessAnalyticDto } from './dto/create-business-analytic.dto';
import { UpdateBusinessAnalyticDto } from './dto/update-business-analytic.dto';

@Injectable()
export class BusinessAnalyticsService {
  create(createBusinessAnalyticDto: CreateBusinessAnalyticDto) {
    return 'This action adds a new businessAnalytic';
  }

  findAll() {
    return `This action returns all businessAnalytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessAnalytic`;
  }

  update(id: number, updateBusinessAnalyticDto: UpdateBusinessAnalyticDto) {
    return `This action updates a #${id} businessAnalytic`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessAnalytic`;
  }
}
