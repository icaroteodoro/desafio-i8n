import { ShoppingCart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function CartDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><ShoppingCart/></DropdownMenuTrigger>
      <DropdownMenuContent className="w-100" align={"end"}>
        <DropdownMenuLabel>Meu carrinho</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Produto X</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
