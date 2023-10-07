import { Product } from '../types/product';
import { Option, Result } from '../types/v-table';

export const useProductStore = defineStore('product', () => {
  const state = reactive({
    loading: false,
    products: [] as Product[],
  });

  async function getProducts(option: Option) {
    let result = {} as Result<Product>;

    state.loading = true;

    await fetch(
      `https://dummyjson.com/products?limit=${option.itemsPerPage}&skip=${
        option.page - 1
      }`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        result = {
          datas: data?.products ?? [],
          total: data?.total ?? 0,
        } as Result<Product>;
      });

    state.loading = false;

    // const result = {
    //   datas: data.value?.products ?? [],
    //   total: data.value?.total ?? 0,
    // } as Result<Product>;

    return result;
  }

  return {
    state,
    getProducts,
  };
});
