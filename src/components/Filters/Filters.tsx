/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { FC } from 'react';
import CustomSelect from '@/ui-kit/Select/CustomSelect';
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
8) Ошибки и ворнинги консоли
9) Тайпскрипт
10) Стейт чтоли запаздывать стал где-то? Добавь побольше данных и тести хорошо
*/

type PropTypes = {
  filters: IProductsFilters;
  setFilters: (filters: IProductsFilters) => void;
  sortingOptions: string[];
  productsMinPrice: number;
  productsMaxPrice: number;
};

const Filters: FC<PropTypes> = ({ filters, setFilters, sortingOptions, productsMinPrice, productsMaxPrice }) => {
  const handleInputChange = ({ target }: HandleInputChangeType) => {
    const [subObject, name] = target.name.split('_');
    if (target.name.includes('materials')) {
      // @ts-ignore
      setFilters((prevState) => ({
        ...prevState,
        page: 1,
        [subObject]: { ...prevState[subObject], [name]: target.checked },
      }));
    } else {
      // @ts-ignore
      setFilters((prevState) => ({ ...prevState, [target.name]: target.value, page: 1 }));
    }
  };

  return (
    <form>
      <CustomSelect
        options={sortingOptions}
        currentOption={filters.sort as string}
        setCurrentOption={(value) => {
          // @ts-ignore
          setFilters((prevFilters) => ({ ...prevFilters, ['sort']: value, page: 1 }));
        }}
        dictionary={sortingDict}
      />
      <input
        name="minPrice"
        value={filters.minPrice as number}
        onChange={handleInputChange}
        placeholder="Минимальная цена"
        type="number"
        min={productsMinPrice}
        max={productsMaxPrice} // Константа - временно
      />
      <input
        name="maxPrice"
        value={filters.maxPrice as number}
        onChange={handleInputChange}
        placeholder="Максимальная цена"
        type="number"
        min={productsMinPrice}
        max={productsMaxPrice} // Константа - временно
      />
      {/* TODO: Чекбоксы кастомные, ну и вообще мэйк бьюти */}
      <div>
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
      </div>
      <input
        type="search"
        placeholder="Поиск по названию"
        name="productName"
        value={filters.productName}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default Filters;
