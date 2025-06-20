import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <Card className="w-100 h-auto py-10 flex justify-center items-center">
        <p className="text-center">Já existe um usuário cadastrado para teste. <br /> As credenciais estão na página de login.</p>
        
        <Link href="/login">
          <Button>Faça login</Button>
        </Link>
        <div className="flex">
          <Separator className="w-50" />
          <p>ou</p>
          <Separator className="w-50" />
        </div>
        <Link href="/register">
          <Button>Faça seu cadastro</Button>
        </Link>
      </Card>
    </section>
  );
}
