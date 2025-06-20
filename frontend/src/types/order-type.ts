type Order = {
    id: string;
    userId: string;
    code: number;
    totalPrice: string;
    orderItems: OrderItem[];
}

type OrderItem = {
    id: string;
    name: string;
    orderId: string;
    imageUrl:string;
    productId: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    createAt: string;
}