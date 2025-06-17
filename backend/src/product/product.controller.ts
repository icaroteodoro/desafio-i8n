import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("brazilian")
  @UseGuards(AuthGuard)
  findAllBrazilian() {
    return this.productService.findAllBrazilan();
  }

  @Get('brazilian/:id')
  @UseGuards(AuthGuard)
  findOneBrazilian(@Param('id') id: number) {
    return this.productService.findOneBrazilian(id);
  }
  @Get("european")
  @UseGuards(AuthGuard)
  findAllEuropean() {
    return this.productService.findAllEuropean();
  }

  @Get('european/:id')
  @UseGuards(AuthGuard)
  findOneEuropean(@Param('id') id: number) {
    return this.productService.findOneEuropean(id);
  }
}
