import CartDropdown from "./cart-dropdown";

export default function Header() {
  return (
    <nav className="fixed bg-white w-screen border-b">
      <div className="container mx-auto py-5 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Minha Loja</h1>
        <div className="flex gap-5">
            <CartDropdown/>
        </div>
      </div>
    </nav>
  );
}
