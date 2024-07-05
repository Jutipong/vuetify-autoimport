import { z } from 'zod'

export interface ProductType {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    status?: string
    start?: Date
    end?: Date
}

// const schema = z.object({
//     title: z.string().min(4, 'Title is required'),
//     price: z.number().min(1, 'Price is required'),
//     rating: z.number().min(1, 'Rating is required'),
//     stock: z.number().min(1, 'Stock is required'),
//     brand: z.string(),
//     discountPercentage: z.number(),
// })

// export type ProductValidate = z.infer<typeof schema>
