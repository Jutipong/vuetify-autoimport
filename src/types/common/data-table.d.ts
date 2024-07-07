interface OptionType {
    page: number
    itemsPerPage: number
    sortBy: SortByType[]
}

interface SortByType {
    key: string
    order: string
}

interface HeaderType {
    title: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
    key: string
}

interface ResultType<TDatas> {
    datas: TDatas[]
    total: number
}

interface TableType<TDatas> {
    headers: readonly HeaderType[]
    options: Option
    result: ResultType<TDatas>
}
