'use client'
import { ListOrdered, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/services/user-service";
import Link from "next/link";

export default function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/orders">
          <DropdownMenuItem>
            <div className="flex size-6 items-center justify-center rounded-md border">
              <ListOrdered className="size-3.5 shrink-0" />
            </div>
            Meus pedidos
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => logout()}>
          <div className="flex size-6 items-center justify-center rounded-md border">
            <LogOut className="size-3.5 shrink-0" />
          </div>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
