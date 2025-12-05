import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessAnalyticsService } from './business-analytics.service';
import { CreateBusinessAnalyticDto } from './dto/create-business-analytic.dto';
import { UpdateBusinessAnalyticDto } from './dto/update-business-analytic.dto';

@Controller('business-analytics')
export class BusinessAnalyticsController {
  constructor(
    private readonly businessAnalyticsService: BusinessAnalyticsService,
  ) {}

  @Post()
  create(@Body() createBusinessAnalyticDto: CreateBusinessAnalyticDto) {
    return this.businessAnalyticsService.create(createBusinessAnalyticDto);
  }

  @Get()
  findAll() {
    return this.businessAnalyticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessAnalyticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessAnalyticDto: UpdateBusinessAnalyticDto,
  ) {
    return this.businessAnalyticsService.update(+id, updateBusinessAnalyticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessAnalyticsService.remove(+id);
  }
}
