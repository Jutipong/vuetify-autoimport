interface ErrorResponse { status: number, message: string }

interface ApiResponse<TData = undefined> {
    data: TData
    error?: ErrorResponse
}
