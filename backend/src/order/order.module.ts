import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemsModule } from 'src/order-items/order-items.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [OrderItemsModule, JwtModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService, OrderItemsModule],
})
export class OrderModule {}
