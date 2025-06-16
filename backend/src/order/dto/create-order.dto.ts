import { OrderItem } from "generated/prisma";
import { CreateOrderItemDto } from "src/order-items/dto/create-order-item.dto";

export class CreateOrderDto {
    userId: string;
    items: CreateOrderItemDto[];
}
