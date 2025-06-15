import Image from "next/image";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

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
  const isValidUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://");

  const imgSrc = isValidUrl(product.imagem)
    ? product.imagem.replace("http://placeimg.com", "https://loremflickr.com")
    : "https://loremflickr.com/640/480"; // Fallback para imagem genérica

  return (
    <Card className="p-2 overflow-hidden gap-2">
      <CardHeader className="p-0">
        <Image
          width={208}
          height={208}
          className="h-52 rounded-md w-full object-cover"
          src={imgSrc}
          alt={product.nome}
        />
      </CardHeader>
      <div className="flex flex-col">
        <div className="mb-4">
          <p className="text-sm text-zinc-500">{product.categoria}</p>
          <p className="text-md font-semibold mb-1">{product.nome}</p>
          <p>{formatarParaReal(product.preco)}</p>
        </div>
        <Button>Adicionar ao carrinho</Button>
      </div>
    </Card>
  );
}
