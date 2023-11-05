interface IProductCategory {
  _id: string;
  productCategoryName: string;
}

interface IProductType {
  _id: string;
  parentCategory: string;
  productTypeName: string;
}

interface IProductSubtype {
  _id: string;
  parentType: string;
  productSubtypeName: string;
}

export type { IProductCategory, IProductType, IProductSubtype };
