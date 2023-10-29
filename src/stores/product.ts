import { ProductType } from '../types/product';
import { Option, Table } from '../types/common/table';
// const { dataTable } = useConstant;

export const useProductStore = defineStore('product', () => {
  const globalStore = useGlobalStore();

  const state = reactive({
    data: {
      status: null,
    },
    master: {
      status: [
        { id: true, text: 'Active' },
        { id: false, text: 'InActive' },
      ],
    },
  });

  async function Create(product: ProductType) {
    globalStore.setLoading();

    await api.post(`/products/add`, product);

    globalStore.unLoading();
    notify.success('Product created successfully');

    return true;
  }

  async function Update(product: ProductType) {
    globalStore.setLoading();

    await api.put(`/products/${product.id}`, {
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

  return {
    state,
    Create,
    Update,
  };
});
