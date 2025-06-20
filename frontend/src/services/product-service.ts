import api from "@/lib/axios";

function mapBrazilianProduct(product: any): Product {
  return {
    id: product.id + "-" + product.nome,
    name: product.name || product.nome,
    description: product.descricao,
    image: product.imagem,
    price: parseFloat(product.preco),
    material: product.material,
    hasDiscount: false,
    category: product.categoria,
    department: product.departamento,
    finalPrice: parseFloat(product.preco),
  };
}

function mapEuropeanProduct(product: any): Product {
  return {
    id: product.id + "-" + product.name,
    name: product.name,
    description: product.description,
    image: product.gallery[0],
    price: parseFloat(product.price),
    material: product.details?.material,
    hasDiscount: product.hasDiscount,
    discountValue: parseFloat(product.discountValue),
    finalPrice: parseFloat(product.price) - (parseFloat(product.price) * parseFloat(product.discountValue))
  };
}

function mergeProducts(
  brazilianProducts: any[],
  europeanProducts: any[]
): Product[] {
  const mappedBrazilian = brazilianProducts.map(mapBrazilianProduct);
  const mappedEuropean = europeanProducts.map(mapEuropeanProduct);
  return [...mappedBrazilian, ...mappedEuropean];
}

export async function getAllProducts() {
  try {
    const resBrazilian = await api.get("/product/brazilian");
    const brazilianProducts = resBrazilian.data;
    const resEuropean = await api.get("/product/european");
    const europeanProducts = resEuropean.data;
    const allProducts: Product[] = mergeProducts(
      brazilianProducts,
      europeanProducts
    );
    return allProducts;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllAttributes() {
  const products = await getAllProducts();
  if (!products) return;
  const categories = products
    .map((product) => product.category)
    .filter(
      (category, index, self) => category && self.indexOf(category) === index
    );
  const materials = products
    .map((product) => product.material)
    .filter(
      (material, index, self) => material && self.indexOf(material) === index
    );

  return {
    categories,
    materials
  };
}

export function getProductImageUrl(imageUrl: string): string {
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (isValidUrl(imageUrl)) {
    return imageUrl.replace("http://placeimg.com", "https://loremflickr.com");
  }

  return "https://loremflickr.com/640/480";
}
