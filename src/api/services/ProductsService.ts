import $api from '..';
import { IProduct } from '@/models/IProduct';

export default class ProductsService {
  // TODO: Пока эни, так как и на бэке ещё с параметрами не всё решил и логику не закончил
  static async fetchProducts(params?: any): Promise<IProduct[]> {
    const productWithWrapper = await $api.request({
      method: 'get',
      url: `/products`,
      params,
    });
    return productWithWrapper.data;
  }

  static async fetchProductById(id: IProduct['_id']): Promise<IProduct> {
    const productWithWrapper = await $api.request({
      method: 'get',
      url: `/products/${id}`,
    });
    return productWithWrapper.data;
  }
}
