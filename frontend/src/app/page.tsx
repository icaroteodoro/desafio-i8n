import CardProduct from "@/components/card-product";
import { getAllProducts } from "@/services/product-service";
import { use } from "react";

export default function Home() {
  const products = use(getAllProducts());
  
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
