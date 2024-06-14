export interface ProductType {
    id: number | null
    title: string | null
    description: string | null
    price: number | null
    discountPercentage: number | null
    rating: number | null
    stock: number | null
    brand: string | null
    category: string | null
    status?: string
}
