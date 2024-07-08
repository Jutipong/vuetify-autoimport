interface DataTableOption {
    page: number
    itemsPerPage: number
    sortBy: DataTableSortBy[]
}

interface DataTableSortBy {
    key: string
    order?: boolean | 'asc' | 'desc'
}

interface DataTableHeader {
    title: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
    key: string
}

interface DataTableResult<TDatas> {
    items: TDatas[]
    itemsLength: number
}

interface DataTableType<TDatas> {
    headers: readonly DataTableHeader[]
    options: DataTableOption
    result: DataTableResult<TDatas>
}
