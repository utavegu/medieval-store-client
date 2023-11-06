'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { toJS } from 'mobx';
import { productsSlice } from '@/store/products.slice';
import Wrapper from '@/layouts/Wrapper/Wrapper';
import CustomSelect from '@/ui-kit/Select/CustomSelect';
import ProductsList from '@/components/ProductsList/ProductsList';
import { sortingDict } from '@/dictionaries/sortingDict';
import { HandleInputChangeType } from '@/typespaces/types/HandleInputChangeType';
import { IProductsFilters } from '@/typespaces/interfaces/IProductsFilters';

/*
TODOs:
1) Почему фокус спадает с поля после выборки? Перерисовываться должен только продукт лист. Из-за обсервера... убрал. И, похоже, общий объект тут не самая лучшая идея - поле сортировки не должно дергаться от того, что я меняю максимальную и минимальную цену. Но, вероятно, это происходит не по этой причине, а из-за парсинга URL-a. Потести эти кейсы, как дойдёшь до оптимизации
2) На смену цены (да и не только ее) тротл/дебонс, чтобы он на каждую букву/цифру запрос не пулял
3) Максимальную цену и набор фильтров нужно будет вычислять на бэке средствами монге (на уровне выборки и отдавать сюда). На счёт цены - чисто на фронтенде можно было бы ещё с юзМемо поэкспериментировать. Не особо приоритетная задача.
4) Навести порядок в minPrice и maxPrice IProductsQueryParams. Вероятно нужно будет разбить на несколько интерфейсов.
5) В книгу рецептов
const productsMaxPrice = toJS(productsSlice?.products)?.reduce((prev, cur) => (cur.price > prev.price ? cur : prev), {price: 0})?.price;
6) Что касается - eslint-disable-next-line react-hooks/exhaustive-deps - запретить на уровне компонента, но разобраться, действительно ли правильно я выставил зависимости в юзЭффектах и в том ли месте применил юзКлоллбэк
7) Либо сделать бронебойные инпут-намберы кастомные, которые вообще не будут жрать значения, которые им нельзя (за пределами мин-макс, буквы, символы...), с управляемыми стрелочками, либо тоже перелазить на UI-фреймворк... Но так как я пока не знаю какой именно - это бэклог-задача
*/

const PRODUCTS_MIN_PRICE = 1;
const PRODUCTS_MAX_PRICE = 100000;

const Catalog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const sortingOptions = ['nameAsc', 'nameDesc', 'priceAsc', 'priceDesc'];

  // TODO: Пока так, но вообще должен приходить с бэка
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
    // searchQuery: '',
    materials: getMaterials(mockMaterials),
  };

  const [filters, setFilters] = useState<IProductsFilters>(filtersInitialState);

  const handleInputChange = ({ target }: HandleInputChangeType) => {
    const [subObject, name] = target.name.split('_');
    if (target.type === 'checkbox') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setFilters((prevState) => ({ ...prevState, [subObject]: { ...prevState[subObject], [name]: target.checked } }));
    } else {
      setFilters((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };

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
  }, [filters]);

  return (
    <Wrapper>
      <CustomSelect
        options={sortingOptions}
        currentOption={filters.sort as string}
        setCurrentOption={(value) => {
          setFilters((prevFilters) => ({ ...prevFilters, ['sort']: value }));
        }}
        dictionary={sortingDict}
      />

      <input
        name="minPrice"
        value={filters.minPrice as number}
        onChange={handleInputChange}
        placeholder="Минимальная цена"
        type="number"
        min={PRODUCTS_MIN_PRICE}
        max={PRODUCTS_MAX_PRICE} // Константа - временно
      />
      <input
        name="maxPrice"
        value={filters.maxPrice as number}
        onChange={handleInputChange}
        placeholder="Максимальная цена"
        type="number"
        min={PRODUCTS_MIN_PRICE}
        max={PRODUCTS_MAX_PRICE} // Константа - временно
      />

      {/* TODO: Чекбоксы кастомные, ну и вообще мэйк бьюти */}
      <div>
        <br />
        Вы можете выбрать комбинацию из указанных материалов:
        <p>
          <label htmlFor="">
            Сталь &nbsp;
            <input
              type="checkbox"
              name="materials_steel"
              checked={filters.materials.steel}
              onChange={handleInputChange}
            />
          </label>
        </p>
        <p>
          <label htmlFor="">
            Дерево &nbsp;
            <input
              type="checkbox"
              name="materials_wood"
              checked={filters.materials.wood}
              onChange={handleInputChange}
            />
          </label>
        </p>
        <p>
          <label htmlFor="">
            Кожа &nbsp;
            <input
              type="checkbox"
              name="materials_leather"
              checked={filters.materials.leather}
              onChange={handleInputChange}
            />
          </label>
        </p>
        <br />
      </div>
      <ProductsList />
    </Wrapper>
  );
};

export default Catalog;
