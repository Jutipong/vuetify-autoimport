export interface Option {
  page: number
  itemsPerPage: number
  sortBy: SortBy[]
}

export interface SortBy {
  key: string
  order: string
}

export interface Header {
  title: string
  align?: 'start' | 'center' | 'end'
  sortable?: false | true
  key: string
}

export interface Result<TDatas> {
  datas: TDatas[]
  total: number
}

export interface Table<TDatas> {
  loading: boolean
  // header: Header[];
  // search: TSearch;
  options: Option
  result: Result<TDatas>
}
