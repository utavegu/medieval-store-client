'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { productsSlice } from '@/store/products.slice';
import { useThrottle } from '@/hooks/useThrottle';
import Wrapper from '@/layouts/Wrapper/Wrapper';
import Pagination from '@/ui-kit/Pagination/Pagination';
import Filters from '@/components/Filters/Filters';
import ProductsList from '@/components/ProductsList/ProductsList';
import { IProductsFilters } from '@/typespaces/interfaces/IProductsFilters';

const Catalog = () => {
  const PRODUCTS_MIN_PRICE = 1;
  const PRODUCTS_MAX_PRICE = 100000;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const sortingOptions = ['nameAsc', 'nameDesc', 'priceAsc', 'priceDesc'];

  // TODO: Пока так, но вообще должен приходить с бэка. Из того, что пришло, мапятся чекбоксы, также на фронтенде есть словарь для перевода на русский
  const mockMaterials = ['steel', 'wood', 'leather'];

  const getMaterials = (materialsArr: string[]) => {
    const materials: { [key: string]: boolean } = {};
    const materialsString = searchParams.get('materials');
    materialsArr.forEach((element) => {
      materials[element] = materialsString?.includes(element) || false;
    });
    return materials;
  };

  const filtersInitialState = {
    sort: searchParams.get('sort') || sortingOptions[0],
    minPrice: searchParams.get('minPrice') || PRODUCTS_MIN_PRICE, // Константа - временно
    maxPrice: searchParams.get('maxPrice') || PRODUCTS_MAX_PRICE, // Константа - временно
    productName: searchParams.get('productName') || '',
    materials: getMaterials(mockMaterials),
    page: searchParams.get('page') || 1,
  };

  const [filters, setFilters] = useState<IProductsFilters>(filtersInitialState);
  const throttledFilters = useThrottle(filters, 1000); // TODO: в константы

  // TODO: Вот теперь точно напрашивается на рефактор
  const createQueryString = useCallback(
    (filtersObject: IProductsFilters) => {
      const params = new URLSearchParams();
      for (const param in filtersObject) {
        const key = param as keyof IProductsFilters;
        if (!filtersObject[key]) {
          delete filtersObject[key];
        } else if (Object.keys(filtersInitialState).includes(key)) {
          if (typeof filtersObject[key] === 'object') {
            const subObject: any = filtersObject[key];
            let paramsString = '';
            for (const subKey in subObject) {
              if (subObject[subKey]) {
                paramsString += `${subKey},`;
              }
            }
            if (paramsString) {
              params.set(key, paramsString.slice(0, -1));
            }
          } else {
            params.set(key, filtersObject[key] as string);
          }
        }
      }

      if (!!params.size) {
        productsSlice.fetchProducts(params);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(pathname + '?' + createQueryString(filters));
  }, [throttledFilters]);

  return (
    <Wrapper>
      <Filters
        filters={filters}
        setFilters={setFilters}
        sortingOptions={sortingOptions}
        productsMinPrice={PRODUCTS_MIN_PRICE}
        productsMaxPrice={PRODUCTS_MAX_PRICE}
      />
      <ProductsList />
      <Pagination
        filters={filters}
        setFilters={setFilters}
      />
    </Wrapper>
  );
};

export default Catalog;
