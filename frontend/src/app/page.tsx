'use client'
import CardProduct from "@/components/card-product";
import { getAllProducts } from "@/services/product-service";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  const mount = async () => {
    const res = await getAllProducts();
    setProducts(res);
  }

  useEffect(() => {
    mount();
  }, []);
  
  return (
    <section className="pt-30 container mx-auto grid grid-cols-5 gap-16">
      {
        products.map((product:any) => (
          <CardProduct key={product.id} product={product}/>
        ))
      }
    </section>
  );
}
