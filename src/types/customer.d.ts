interface Customer {
    id?: number | null
    Name?: string
    Last?: string
    Address: string
    Details: [
        {
            id: string
            name: string
        },
    ]
}
