interface ErrorResponseType { status: number, message: string }
interface ApiResponseType<TData = undefined> {
    data: TData
    error?: ErrorResponseType
}
