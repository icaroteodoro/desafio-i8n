import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("brazilian")
  findAllBrazilian() {
    return this.productService.findAllBrazilan();
  }

  @Get('brazilian/:id')
  findOneBrazilian(@Param('id') id: number) {
    return this.productService.findOneBrazilian(id);
  }
  @Get("european")
  findAllEuropean() {
    return this.productService.findAllEuropean();
  }

  @Get('european/:id')
  findOneEuropean(@Param('id') id: number) {
    return this.productService.findOneEuropean(id);
  }
}
