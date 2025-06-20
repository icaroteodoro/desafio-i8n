"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/cartContext";
import { createOrder } from "@/services/order-service";
import { getProductImageUrl } from "@/services/product-service";
import { getUserIdFromToken } from "@/services/token-service";
import {  CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatarParaReal(valor: string): string {
  const price = parseFloat(valor);
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Checkout() {
  const { cart, addQuantity, removeQuantity, getTotalPrice, getTotalItems , removeFromCart,clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  function finishOrder(){
    setIsLoading(true);
    try {
        const userId = getUserIdFromToken()
        const res = createOrder(userId, cart);
        if(!res) {
            toast("Não foi possível finalizar a compra", {
                icon: <CircleX className="text-red-700"/>,
                className: "text-red-700"
            });
            return;
        }
        toast("Compra finalizada com sucesso", {
            icon: <CircleX className="text-green-700"/>,
            className: "text-green-700"
        });
        clearCart();
        window.location.href = '/home';
    }catch(err) {
        toast("Não foi possível finalizar a compra", {
            icon: <CircleX className="text-red-700"/>,
            className: "text-red-700"
        });
        return;
    }
  }

  return (
    <section className="pt-30 container mx-auto flex gap-4">
      <Card className="w-8/12 rounded-md px-7">
        {cart.map((product) => (
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
                <p className="text-sm text-zinc-600">Elegível para Frete GRÁTIS</p>
                <div className="flex items-center gap-2 mt-5">
                  <Button onClick={() => removeQuantity(product.id)} className="p-2 w-6 h-6"> - </Button>
                    <p className="border flex justify-center items-center rounded-md w-6 h-6">{product.quantity}</p>
                  <Button onClick={() => addQuantity(product.id)} className="p-2 w-6 h-6"> + </Button>

                  <Button variant={"link"} onClick={() => removeFromCart(product.id)}>Remover item</Button>
                </div>
              </div>
            </div>
            <div className="my-auto text-right">
                <p className="text-xl font-medium">{formatarParaReal(product.unitPrice.toString())}</p>
                <p className="text-sm">ou em até 10x de {formatarParaReal((product.unitPrice / 10).toString())}</p>
                <p className="text-sm">sem juros</p>
            </div>
          </Card>
        ))}
        <div className="flex justify-end">
            <p className="text-xl">
            Subtotal ({getTotalItems()} produtos): <span className="font-semibold"> {formatarParaReal(getTotalPrice().toString())}</span>
            </p>
        </div>
      </Card>
      <Card className="w-4/12 rounded-md h-max p-10">
        <div className="flex flex-col gap-1 items-center">
            <CircleCheck className="text-3xl text-green-800"/>
            <p className="text-green-800 text-sm text-center">Seu pedido tem frete GRÁTIS.</p>
        </div>
        <p className="text-lg text-center">
            Subtotal ({getTotalItems()} produtos): <span className="font-semibold"> {formatarParaReal(getTotalPrice().toString())}</span>
        </p>
        <Button disabled={isLoading} onClick={() => finishOrder()} className="bg-green-800 hover:bg-green-700">
            {
                isLoading ? 'Carregando' : 'Fechar o pedido'
            }
        </Button>
      </Card>
    </section>
  );
}
