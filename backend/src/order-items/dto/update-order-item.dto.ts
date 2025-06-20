import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderItemDto } from './create-order-item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    name: string;
    orderId: string;
    imageUrl: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
