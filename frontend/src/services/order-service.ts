import api from "@/lib/axios";
import { getUserIdFromToken } from "./token-service";

export async function createOrder(userId: string, cartProducts: CartProduct[]) {
  const items: CreateOrderItemDto[] = cartProducts.map((product) => ({
    name: product.name,
    productId: product.id,
    imageUrl: product.imageUrl,
    quantity: product.quantity,
    unitPrice: product.unitPrice,
  }));

  return await api.post("/order", {
    userId,
    items,
  });
}


export async function getAllOrderByUserId(){
  const userId = getUserIdFromToken();

  const res =  await api.get('/order/user/' + userId);
  return res.data;
}

export async function getOrderById(orderId:string) {
  const res = await api.get('/order/' + orderId);
  return res.data;
}