"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/cartContext";
import { createOrder, getAllOrderByUserId } from "@/services/order-service";
import { getProductImageUrl } from "@/services/product-service";
import { getUserIdFromToken } from "@/services/token-service";
import { CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";



export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function mount() {
    const res = await getAllOrderByUserId();
    setOrders(res);
  }

  useEffect(() => {
    mount();
  }, []);

  return (
    <section className="pt-30 container mx-auto flex gap-4">
      <Card className="w-12/12 rounded-md px-7">
        {!orders
          ? ""
          : orders.map((order) => (
              <Card key={order.id} className="p-2 flex-row justify-between">
                <div className="flex gap-4">
                  <Image
                    width={250}
                    height={200}
                    alt={order.orderItems[0].name}
                    src={getProductImageUrl(order.orderItems[0].imageUrl)}
                    className="h-32 w-36 object-cover rounded-sm"
                  />
                  <div className="my-auto">
                    <p className="text-lg font-semibold text-orange-500">Em transporte</p>
                    <p className="text-xs text-zinc-800">Compra realizada dia {new Date(order.orderItems[0].createAt).getDate()} de {new Date(order.orderItems[0].createAt).toLocaleDateString('pt-BR', {month: 'long'})}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <p>Previsão de entrega em <br /> 15 dias úteis</p>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <Link className="w-full" href={`/order/${order.id}`}>
                    <Button className="w-full">Ver compra</Button>
                  </Link>
                  <Button variant={"outline"}>Comprar novamente</Button>
                </div>
              </Card>
            ))}
      </Card>
    </section>
  );
}
