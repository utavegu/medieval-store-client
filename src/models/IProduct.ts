import { IProductCategory, IProductSubtype, IProductType } from './IProductsCategories';

// TODO: сделай 2 отдельные интерфейса - для того продукта, который ожидает сервер и того, который для формы на фронтенде

export interface IProduct {
  _id: string;
  productName: string;
  description?: string;
  price: number | string; // временно добавил тип строки
  discount?: number | string; // временно добавил тип строки
  category: IProductCategory;
  type: IProductType;
  subtype?: IProductSubtype;
  photos?: [string];
  // productsAvailability?: [ProductsAvailability];
  createdAt: Date;
  updatedAt?: Date;
}
