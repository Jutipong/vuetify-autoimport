export type ProductType = {
  id: number | null;
  title: string | null;
  description: string | null;
  price: number | null;
  discountPercentage: number | null;
  rating: number | null;
  stock: number | null;
  brand: string | null;
  category: string | null;
};

export function newProductType(): ProductType {
  return {
    id: null,
    title: null,
    price: null,
    rating: null,
    stock: null,
    brand: null,
    category: null,
  } as ProductType;
}

export type SearchPropsType = {
  search: {
    name: string | null;
    last: string | null;
    status: string | null;
  };
  GetProducts: Function;
  onClear: Function;
};
