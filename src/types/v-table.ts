export type Option = {
  page: number;
  itemsPerPage: number;
  sortBy: SortBy[];
};

export type SortBy = {
  key: string;
  order: string;
};

export type Header = {
  title: string;
  align?: 'start' | 'center' | 'end';
  sortable?: false | true;
  key: string;
};

export type Result<TDatas> = {
  datas: TDatas[];
  total: number;
};

export type vTable<TSearch, TDatas> = {
  header: Header[];
  search: TSearch;
  options: Option;
  result: Result<TDatas>;
};
