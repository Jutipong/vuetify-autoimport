interface Product {
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
    autoCompleteServer: string | null
    autoCompleteMultipleServer: string[] | null
    files: File
}

interface File {
    name: string
    size: number
    type: string
    base64: string
}
