"use client";
import CardProduct from "@/components/card-product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllAttributes, getAllProducts } from "@/services/product-service";
import { useEffect, useState } from "react";

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<(string | undefined)[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<(string | undefined)[]>();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [quantityProductsView, setQuantityProductView] = useState(16);
  const [sortOption, setSortOption] = useState("")
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [errorMinPrice, setErrorMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [errorMaxPrice, setErrorMaxPrice] = useState("");

  const mount = async () => {
    const res = await getAllProducts();
    if (!res) return;
    setAllProducts(res);
    setProducts(res);

    const attributes = await getAllAttributes();
    setCategories(attributes?.categories);
    setMaterials(attributes?.materials);
  };

  const toggleCategory = (category: string | undefined) => {
    if (!category) return;
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleMaterial = (material: string | undefined) => {
    if (!material) return;
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  useEffect(() => {
    mount();
  }, []);

  const toggleMinPrice = (value:number) =>{

    if(maxPrice != 0 && value > maxPrice) {
      setErrorMinPrice("O valor mínimo deve ser menor que o valor máximo");
      return;
    }
    setErrorMinPrice("");
    setMinPrice(value);
  }
  const toggleMaxPrice = (value:number) =>{
    if(value < minPrice) {
      setErrorMaxPrice("O valor máximo deve ser maior que o valor mínimo");
      return;
    }
    setErrorMaxPrice("");
    setMaxPrice(value);
  }

  useEffect(() => {
    let filteredProducts = allProducts;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category!)
      );
    }

    if (selectedMaterials.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedMaterials.includes(product.material!)
      );
    }

    if (search.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice !== 0) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }

    if (maxPrice !== 0) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    if (sortOption === "minor-price") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    }

    if (sortOption === "major-price") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    setProducts(filteredProducts);
  }, [selectedCategories, selectedMaterials, search, sortOption, minPrice, maxPrice, allProducts]);

  return (
    <section className="pt-30  container mx-auto">
      <div className="pb-20 flex justify-end gap-20">
        <div>
          <label>Pesquisar pelo nome:</label>
          <Input onChange={(e) => setSearch(e.target.value)} className="w-72" />
        </div>
        <div>
          <label>Ordenar por:</label>
          <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
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
          <label>Filtrar por preço:</label>
          <div className="flex flex-col">
              <div className="flex gap-5">
                <Input type="number" onChange={e => toggleMinPrice(e.target.value ? parseFloat(e.target.value) : 0)} placeholder="Preço Min." />
                <Input type="number" onChange={e => toggleMaxPrice(e.target.value ? parseFloat(e.target.value) : 0)} placeholder="Preço Max." />
              </div>
              {!errorMinPrice ? '' : <span className="text-red-500">{errorMinPrice}</span>}
              {!errorMaxPrice ? '' : <span className="text-red-500">{errorMaxPrice}</span>}
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-2/12 h-max mb-10 pb-16 border rounded-md p-5">
          <h2 className="text-md font-semibold">Categorias</h2>
          <div className="flex flex-col gap-2 pt-4">
            {!categories
              ? "Carregando"
              : categories.map(
                  (category, index) =>
                    category && (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${index}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`category-${index}`}>{category}</Label>
                      </div>
                    )
                )}
          </div>
          <h2 className="text-md font-semibold mt-10">Materiais</h2>
          <div className="flex flex-col gap-2 pt-4">
            {!materials
              ? "Carregando"
              : materials.map(
                  (material, index) =>
                    material && (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${index}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleMaterial(material)}
                        />
                        <Label htmlFor={`material-${index}`}>{material}</Label>
                      </div>
                    )
                )}
          </div>
        </div>
        <div className="w-10/12">
          <div className="grid grid-cols-4 gap-16 pb-20">
            {products.slice(0, quantityProductsView).map((product: any) => (
              <CardProduct key={product.id + product.name} product={product} />
            ))}
          </div>
          {quantityProductsView > products.length ? (
            ""
          ) : (
            <div className="pb-10 flex justify-center">
              <Button
                onClick={() =>
                  setQuantityProductView(quantityProductsView + 16)
                }
              >
                Carregar mais produtos
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
