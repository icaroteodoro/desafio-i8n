"use client";
import CardProduct from "@/components/card-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllProducts } from "@/services/product-service";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [quantityProductsView, setQuantityProductView] = useState(15);

  const mount = async () => {
    const res = await getAllProducts();
    setProducts(res);
  };

  useEffect(() => {
    mount();
  }, []);

  return (
    <section className="pt-30 container mx-auto">
      <div className="pb-20 flex gap-20">
        <div>
          <label>Nome do produto:</label>
          <Input className="w-72" />
        </div>
        <div>
          <label>Ordenar por:</label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="---" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="---"> --- </SelectItem>
              <SelectItem value="minor-price">Menor preço</SelectItem>
              <SelectItem value="major-price">Maior preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Filtrar por categoria:</label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="---" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="---"> --- </SelectItem>
              <SelectItem value="refined">Refined</SelectItem>
              <SelectItem value="pratical">Practical</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="small">Handmade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Filtrar por preço:</label>
          <div className="flex gap-5">
          <Input type="number" placeholder="Preço Min."/>
          <Input type="number" placeholder="Preço Max."/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-16 pb-20">
        {products.slice(0, quantityProductsView).map((product: any) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      {quantityProductsView > products.length ? (
        ""
      ) : (
        <div className="pb-10 flex justify-center">
          <Button
            onClick={() => setQuantityProductView(quantityProductsView + 15)}
          >
            Carregar mais produtos
          </Button>
        </div>
      )}
    </section>
  );
}
