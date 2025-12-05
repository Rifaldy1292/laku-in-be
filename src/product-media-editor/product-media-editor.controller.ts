import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductMediaEditorService } from './product-media-editor.service';
import { CreateProductMediaEditorDto } from './dto/create-product-media-editor.dto';
import { UpdateProductMediaEditorDto } from './dto/update-product-media-editor.dto';

@Controller('product-media-editor')
export class ProductMediaEditorController {
  constructor(
    private readonly productMediaEditorService: ProductMediaEditorService,
  ) {}

  @Post()
  create(@Body() createProductMediaEditorDto: CreateProductMediaEditorDto) {
    return this.productMediaEditorService.create(createProductMediaEditorDto);
  }

  @Get()
  findAll() {
    return this.productMediaEditorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productMediaEditorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductMediaEditorDto: UpdateProductMediaEditorDto,
  ) {
    return this.productMediaEditorService.update(
      +id,
      updateProductMediaEditorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productMediaEditorService.remove(+id);
  }
}
