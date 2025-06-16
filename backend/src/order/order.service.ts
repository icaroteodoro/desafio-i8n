import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem, Prisma, PrismaClient } from 'generated/prisma';
import { OrderItemsService } from 'src/order-items/order-items.service';

const prisma = new PrismaClient();

@Injectable()
export class OrderService {
  constructor(private orderItemService: OrderItemsService) {}

  async create(data: CreateOrderDto) {
    const code = Math.floor(1000 + Math.random() * 9000);

    const totalPriceOrder = data.items.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);

    await prisma.order.create({
      data: {
        code,
        totalPrice: totalPriceOrder,
        orderItems: {
          create: data.items.map((item) => ({
            name: item.name,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
          })),
        },
        userId: data.userId,
      },
      include: {
        orderItems: true,
      },
    });

    return HttpStatus.OK;
  }

  async findAllOrdersByUserId(userId: string) {
    return await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true
      }
    });
  }

  async findAll() {
    return await prisma.order.findMany();
  }

  async findOne(id: string) {
    return await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await prisma.order.update({
      where: {
        id,
      },
      data: updateOrderDto,
    });
  }

  async remove(id: string) {
    return await prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
