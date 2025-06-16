import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
import { UpdateOrderItemDto } from 'src/order-items/dto/update-order-item.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    userId: string;
    items: UpdateOrderItemDto[];
}
