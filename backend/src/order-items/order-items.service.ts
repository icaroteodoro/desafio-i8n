import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient();

@Injectable()
export class OrderItemsService {
  async create(data: CreateOrderItemDto) {
   
  }

  async findAll() {
    return await prisma.orderItem.findMany();
  }

  async findOne(id: string) {
    return await prisma.orderItem.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, data: UpdateOrderItemDto) {
    await prisma.orderItem.update({
      where: {
        id
      },
      data: data
    });
  }

  async remove(id: string) {
    return await prisma.orderItem.delete({
      where: {
        id
      }
    });
  }
}
