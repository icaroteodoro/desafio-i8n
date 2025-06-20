interface iProductCardProps {
    id:string,
    image: string,
    name: string,
    price: string,
    category: string,
    hasDiscount: boolean,
    discountValue: number
    finalPrice: number,
}

type Product = {
  id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  material?: string;
  category?: string;
  department?: string;
  hasDiscount?: boolean;
  discountValue?: number;
  finalPrice: number;
};

type BrazilianProduct = {
    id?: number,
    nome: string,
    descricao: string,
    categoria:string,
    imagem: string,
    preco:number,
    material: string,
    departamento: string,
}

type EuropeanProduct = {
    id?: string,
    name: string,
    description: string,
    price: number,
    hasDiscount: boolean,
    discountValue: number,
    details: {
        adjective: string,
        material: string
    }
    gallery: string[]
}

type CartProduct = {
  id: string,
  name: string,
  quantity: number,
  unitPrice: number,
  totalPrice: number,
  imageUrl: string,
};

type CreateOrderItemDto = {
    name: string;
    productId: string;
    imageUrl: string;
    quantity: number;
    unitPrice: number;
}