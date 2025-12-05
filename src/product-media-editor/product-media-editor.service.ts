import { Injectable } from '@nestjs/common';
import { CreateProductMediaEditorDto } from './dto/create-product-media-editor.dto';
import { UpdateProductMediaEditorDto } from './dto/update-product-media-editor.dto';

@Injectable()
export class ProductMediaEditorService {
  create(createProductMediaEditorDto: CreateProductMediaEditorDto) {
    return 'This action adds a new productMediaEditor';
  }

  findAll() {
    return `This action returns all productMediaEditor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productMediaEditor`;
  }

  update(id: number, updateProductMediaEditorDto: UpdateProductMediaEditorDto) {
    return `This action updates a #${id} productMediaEditor`;
  }

  remove(id: number) {
    return `This action removes a #${id} productMediaEditor`;
  }
}
