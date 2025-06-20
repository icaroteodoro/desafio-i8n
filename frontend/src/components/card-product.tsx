'use client'
import Image from "next/image";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { getProductImageUrl } from "@/services/product-service";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import { useCart } from "@/context/cartContext";

interface iProductCard {
  product: iProductCardProps;
}

function formatarParaReal(valor: string): string {
  const price = parseFloat(valor);
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CardProduct({ product }: iProductCard) {
  const imgSrc = getProductImageUrl(product.image);

  const {addToCart} = useCart();


  const getFinalPrice = (price:string) => {
    const priceNumber = parseFloat(price);
    return (priceNumber - (priceNumber * product.discountValue)).toString()
  }

  const cartProduct: CartProduct = {
    id: product.id,
    name: product.name,
    quantity: 1,
    unitPrice: product.finalPrice,
    totalPrice: product.finalPrice,
    imageUrl: product.image
  }

  function addProductToCart (product: CartProduct) {
    addToCart(product);
    toast('Produto adicionado ao carrinho',{
      icon: <CircleCheck className="text-green-600"/>,
      className: 'flex gap-4'
    })
  }

  return (
    <Card className="p-2 overflow-hidden gap-2">
      <CardHeader className="p-0">
        <Image
          width={208}
          height={208}
          className="h-52 rounded-md w-full object-cover"
          src={imgSrc}
          alt={product.name}
        />
      </CardHeader>
      <div className="flex flex-col">
        <div className="mb-4">
          <p className="text-sm h-5 text-zinc-500">{product.category}</p>
          <p className="text-md font-semibold mb-1">{product.name}</p>
          <div className="flex gap-2">
            {
              !product.hasDiscount ? '' :
              <p className="font-semibold text-lg">{formatarParaReal(getFinalPrice(product.price))}</p>

            }
            <p className={!product.hasDiscount ? 'font-semibold text-xl' : 'text-red-600 line-through text-sm'}>{formatarParaReal(product.price)}</p>
          </div>
        </div>
        <Button onClick={() => addProductToCart(cartProduct)}>Adicionar ao carrinho</Button>
      </div>
    </Card>
  );
}


