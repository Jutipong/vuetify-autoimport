export {}
declare global {

    export interface ErrorResponse { status: number, message: string }
    export interface ApiResponse<TData = undefined> {
        data: TData
        error?: ErrorResponse
    }

}
