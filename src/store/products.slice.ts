import { makeAutoObservable } from 'mobx';
import ProductsService from '@/api/services/ProductsService';
import { IProduct } from '../models/IProduct';

class ProductsSlice {
  product = null as unknown as IProduct;
  products = [] as IProduct[];
  isLoading = false;
  error = null as Error | null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setError(error: Error | null) {
    this.error = error;
  }

  setProduct(product: IProduct) {
    this.product = product;
  }

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  // TODO: пока эни
  async fetchProducts(filters: any) {
    try {
      this.setLoading(true);
      this.setError(null);
      const products = await ProductsService.fetchProducts(filters);
      if (products) {
        this.setProducts(products);
      }
    } catch (error) {
      console.error(error);
      this.setError(error as Error);
    } finally {
      this.setLoading(false);
    }
  }

  async fetchTargetProduct(id: IProduct['_id']) {
    try {
      this.setLoading(true);
      this.setError(null);
      const product = await ProductsService.fetchProductById(id);
      if (product) {
        this.setProduct(product);
      }
    } catch (error) {
      console.error(error);
      this.setError(error as Error);
    } finally {
      this.setLoading(false);
    }
  }
}

const productsSlice = new ProductsSlice();
export { productsSlice };
