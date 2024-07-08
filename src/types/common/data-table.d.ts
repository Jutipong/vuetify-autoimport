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
    datas: TDatas[]
    total: number
}

interface DataTableType<TDatas> {
    headers: readonly DataTableHeader[]
    options: DataTableOption
    result: DataTableResult<TDatas>
}
