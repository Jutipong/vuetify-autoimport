interface Option {
    page: number
    itemsPerPage: number
    sortBy: SortBy[]
}

interface SortBy {
    key: string
    order: string
}

interface Header {
    title: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
    key: string
}

interface Result<TDatas> {
    datas: TDatas[]
    total: number
}

interface Table<TDatas> {
    headers: readonly Header[]
    options: Option
    result: Result<TDatas>
}
