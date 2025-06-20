"use client";
import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

function formatarParaReal(valor: string): string {
  const price = parseFloat(valor);
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CartDropdown() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const {cart: cartProducts ,addQuantity, getTotalPrice, removeQuantity, getTotalItems} = useCart();


  const handleAddQuantity = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    addQuantity(productId);
  };

  const handleRemoveQuantity = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    removeQuantity(productId);
  };

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger className="hover:cursor-pointer">
        <ShoppingCart />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100" align={"end"}>
        <DropdownMenuLabel>Meu carrinho</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!cartProducts
          ? ""
          : cartProducts.map((product) => (
              <DropdownMenuItem key={product.id} className="flex justify-between border rounded-sm h-16 p-1 mb-2">
                <div className="flex gap-5">
                  <Image
                    className="rounded-sm object-cover h-14 w-14"
                    alt="Algum nome"
                    src="https://loremflickr.com/640/480/nature"
                    width={150}
                    height={120}
                  />
                  <div className="flex flex-col">
                    <p>{product.name}</p>
                    <p>
                      {formatarParaReal(product.unitPrice.toString())}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={(e) => handleRemoveQuantity(e,product.id)} className="p-2 w-6 h-6"> - </Button>
                    <p className="border flex justify-center items-center rounded-md w-6 h-6">{product.quantity}</p>
                  <Button onClick={(e) => handleAddQuantity(e,product.id)} className="p-2 w-6 h-6"> + </Button>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between border rounded-sm h-16 p-1 mb-2">
              <p className="font-semibold">Total:</p>
              <p>{formatarParaReal(getTotalPrice().toString())}</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {
              getTotalItems() === 0 ? '' : 
              <Link onClick={() => setOpenDropdown(false)} className="flex justify-center py-2 rounded-sm bg-green-600 text-white" href="/checkout">Finalizar compra</Link>
            }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}