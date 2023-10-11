import { Product } from '../types/product';
import { Option, Table } from '../types/table';
const { pageSize } = useTableConfig;

export const useProductStore = defineStore('product', () => {
  const state = reactive({
    loading: false,
    table: {
      search: null,
      header: [
        { title: 'ID', key: 'id', align: 'center' },
        { title: 'Title', key: 'title' },
        { title: 'PRICE', key: 'price', align: 'end' },
        { title: 'RATING', key: 'rating', align: 'end' },
        { title: 'STOCK', key: 'stock', align: 'end' },
        { title: 'BRAND', key: 'brand', align: 'end' },
      ],
      options: {
        page: 1,
        itemsPerPage: pageSize,
        sortBy: [],
      },
      result: {
        datas: [],
        total: 0,
      },
    } as Table<string | null, Product>,
  });

  async function getProducts(option: Option | null = null) {
    state.loading = true;
    state.table.options = option ? option : state.table.options;

    const page =
      state.table.options.page === 1
        ? 0
        : (state.table.options.page - 1) * state.table.options.itemsPerPage;

    await fetch(
      `${appConfig.url.api}/products/search?q=${state.table.search ?? ''}&limit=${
        state.table.options.itemsPerPage
      }&skip=${page}`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        state.table.result.datas = data?.products ?? [];
        state.table.result.total = data?.total ?? 10;
      });

    state.loading = false;
  }

  async function onClean() {
    state.table.search = null;
    await getProducts();
  }

  return {
    state,
    getProducts,
    onClean,
  };
});
