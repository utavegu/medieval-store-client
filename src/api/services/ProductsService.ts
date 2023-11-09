import $api from '..';
import { IProduct } from '@/models/IProduct';

export default class ProductsService {
  // TODO: А какие именно URLSearchParams уточнить можно?
  // TODO: Тут паттерн адаптер напрашивается. И почитай реализацию аксиосовского.
  static async fetchProducts(params?: URLSearchParams): Promise<{ products: IProduct[]; pages: number }> {
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
