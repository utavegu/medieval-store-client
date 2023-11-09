export interface IProductsFilters {
  sort: string | null;
  minPrice: string | null | number;
  maxPrice: string | null | number;
  productName: string;
  materials: { [key: string]: boolean };
  page: string | number;
}
