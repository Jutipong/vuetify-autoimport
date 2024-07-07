interface DataTableOptionType {
    page: number
    itemsPerPage: number
    sortBy: DataTableSortByType[]
}

interface DataTableSortByType {
    key: string
    order: string
}

interface DataTableHeaderType {
    title: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
    key: string
}

interface DataTableResultType<TDatas> {
    datas: TDatas[]
    total: number
}

interface DataTableType<TDatas> {
    headers: readonly DataTableHeaderType[]
    options: DataTableOptionType
    result: DataTableResultType<TDatas>
}
