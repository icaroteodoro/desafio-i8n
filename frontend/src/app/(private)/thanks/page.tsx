import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function Thanks() {
  return (
    <section className="pt-30 container mx-auto flex items-center justify-center">
      <Card className="p-20 flex justify-center items-center">
        <CircleCheck className="w-40 h-40 text-green-800" />
        <h2 className="text-green-900 text-4xl">
          Obrigado por comprar conosco!
        </h2>
        <p className="text-xl">
          Sua compra está prevista para ser entregue em 15 dias úteis!
        </p>
        <Link href="/home">
          <Button>Voltar para a loja</Button>
        </Link>
      </Card>
    </section>
  );
}
