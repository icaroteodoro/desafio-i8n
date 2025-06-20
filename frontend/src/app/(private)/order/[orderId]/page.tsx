"use client";
import { Card } from "@/components/ui/card";
import { getOrderById } from "@/services/order-service";
import { getProductImageUrl } from "@/services/product-service";
import { Truck } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function formatarParaReal(valor: string): string {
  const price = parseFloat(valor);
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Order() {
  const [order, setOrder] = useState<Order>()
  const params = useParams();
  const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;

  async function mount() {
    if(!orderId) return; 
    const res = await getOrderById(orderId);
    setOrder(res);
  }

  function getQuantityItems() {
    if(!order) return 0;
    const quantity = order.orderItems.reduce((acc, item) => (item.quantity + acc), 0)
    return quantity;
  }

  useEffect(() => {
    mount()
  },[])


  return (
    <section className="pt-30 container mx-auto flex gap-4">
      <Card className="w-8/12 rounded-md px-7">
        <h2 className="text-2xl font-semibold">Número do pedido: {order?.code}</h2>
        {
        !order ? '' :
        !order.orderItems ? '' :
        order.orderItems.map((product) => (
          <Card key={product.id} className="p-2 flex-row justify-between">
            <div className="flex gap-4">
              <Image
                width={250}
                height={200}
                alt={product.name}
                src={getProductImageUrl(product.imageUrl)}
                className="h-32 w-36 object-cover rounded-sm"
              />
              <div className="my-auto">
                <p className="text-lg">{product.name}</p>
                <p className="text-xs text-green-800">Em estoque</p>
                <p className="text-sm text-zinc-600">
                  {product.quantity} {product.quantity == 1 ? 'unidade' : 'unidades'}
                </p>
              </div>
            </div>
            <div className="my-auto text-right">
              <p className="text-xl font-medium">
                {formatarParaReal(product.unitPrice.toString())}
              </p>
              <p className="text-sm">
                ou em até 10x de{" "}
                {formatarParaReal((parseFloat(product.unitPrice) / 10).toString())}
              </p>
              <p className="text-sm">sem juros</p>
            </div>
          </Card>
        ))}
        <div className="flex justify-end">
          <p className="text-xl">
            Total ({getQuantityItems()} produtos):{" "}
            <span className="font-semibold">
              {" "}
              {formatarParaReal(order ? order.totalPrice : '')}
            </span>
          </p>
        </div>
      </Card>
      <Card className="w-4/12 rounded-md h-max p-10">
        <div className="flex flex-col gap-1 items-center">
            <Truck className="h-20 w-20 text-orange-600"/>
            <p className="text-orange-600 text-xl text-center">Pedido em transporte</p>
        </div>
      </Card>
    </section>
  );
}
