import { Product } from '../types/product';
import { Option, Table } from '../types/common/table';

const { app, baseUrl, dataTable } = useConstant;

export const useProductStore = defineStore('product', () => {
  const globalStore = useGlobalStore();

  const state = reactive({
    data: {
      table: {
        loading: false,
        search: null,
        header: [
          { title: 'ID', key: 'id', align: 'center' },
          { title: 'Title', key: 'title' },
          { title: 'PRICE', key: 'price', align: 'end' },
          { title: 'RATING', key: 'rating', align: 'end' },
          { title: 'STOCK', key: 'stock', align: 'end' },
          { title: 'BRAND', key: 'brand', align: 'end' },
          { title: 'Actions', key: 'actions', sortable: false },
        ],
        options: {
          page: 1,
          itemsPerPage: dataTable.pageSize,
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
    state.data.table.loading = true;
    state.data.table.options = option ? option : state.data.table.options;

    const page =
      state.data.table.options.page === 1
        ? 0
        : (state.data.table.options.page - 1) * state.data.table.options.itemsPerPage;

    const res: any = await api.get(
      `${baseUrl.api}/products/search?q=${state.data.table.search ?? ''}&limit=${
        state.data.table.options.itemsPerPage
      }`
    );

    state.data.table.result.datas = res?.products ?? [];
    state.data.table.result.total = res?.total ?? 10;

    state.data.table.loading = false;
  }

  async function Create(product: Product): Promise<boolean> {
    globalStore.setLoading();

    await api.post(`${baseUrl.api}/products/add`, product);

    globalStore.unLoading();
    notify.success('Product created successfully');

    return true;
  }

  async function Update(product: Product): Promise<boolean> {
    globalStore.setLoading();

    await api.put(`${baseUrl.api}/products/${product.id}`, {
      title: product.title,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
    });

    globalStore.unLoading();
    notify.success('Product updated successfully');

    return true;
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
    Update,
  };
});
