import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemsModule } from 'src/order-items/order-items.module';

@Module({
  imports: [OrderItemsModule],
  controllers: [OrderController],
  providers: [OrderService, OrderItemsModule],
})
export class OrderModule {}
