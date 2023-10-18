import { Product } from '../types/product';
import { Option, Table } from '../types/common/table';

const { pageSize } = useTableConfig;

export const useProductStore = defineStore('product', () => {
  const state = reactive({
    data: {
      loading: false,
      activeModal: false,
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
      status: null,
    },
    master: {
      status: [
        { id: true, text: 'Active' },
        { id: false, text: 'InActive' },
      ],
    },
  });

  async function GetProducts(option: Option | null = null) {
    state.data.loading = true;
    state.data.table.options = option ? option : state.data.table.options;

    const page =
      state.data.table.options.page === 1
        ? 0
        : (state.data.table.options.page - 1) * state.data.table.options.itemsPerPage;

    const res: any = await api.get(
      `${appConfig.url.api}/products/search?q=${state.data.table.search ?? ''}&limit=${
        state.data.table.options.itemsPerPage
      }`
    );

    state.data.table.result.datas = res?.products ?? [];
    state.data.table.result.total = res?.total ?? 10;

    state.data.loading = false;
  }

  async function Create(product: Product) {
    state.data.loading = true;

    debugger;
    const res = await api.post(`${appConfig.url.api}/products/add`, product);

    notify.success('Product created successfully');
    state.data.loading = false;
  }

  async function Clear() {
    state.data.table.search = null;
    await GetProducts();
  }

  return {
    state,
    GetProducts,
    Clear,
    Create,
  };
});
