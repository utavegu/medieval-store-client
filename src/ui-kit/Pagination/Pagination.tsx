/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { productsSlice } from '@/store/products.slice';
import { IProductsFilters } from '@/typespaces/interfaces/IProductsFilters';

type PropTypes = {
  filters: IProductsFilters;
  setFilters: (filters: IProductsFilters) => void;
};

/*
  TODO:
  1) Стилизация
  2) На перспективу: Если страниц слишком дофига, то показывать только первые и последние 3, а между ними "...", но по мере продвижения крайние 3 страницы также меняются, но первая и последняя всегда доступны... или как там это делается, посмотри. И вообще пагинация должна быть частью UI-kit
  3) Убрать драй из установки оффсета. Сделай кейсом и прокидывай нужный параметр из енумки (следующая, предыдущая, конкретная (таргет)), остальное пусть сам вычисляет
  4) Тайпскрипт
  */

const Pagination: FC<PropTypes> = ({ filters, setFilters }) => {
  const pagesCount = productsSlice?.products?.pages;
  const pagesBookmarks = new Array(pagesCount).fill('');

  return (
    <div>
      {pagesCount > 1 && (
        <div>
          <button
            disabled={Number(filters.page) <= 1}
            onClick={() => {
              // @ts-ignore
              setFilters((prevState) => ({ ...prevState, page: Number(prevState.page) - 1 }));
            }}
          >
            Предыдущая страница
          </button>
          {pagesBookmarks.map((_, i) => (
            <button
              key={i}
              style={filters.page === i + 1 ? { border: '1px solid red' } : { border: '1px solid black' }}
              onClick={() => {
                // @ts-ignore
                setFilters((prevState) => ({ ...prevState, page: i + 1 }));
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={Number(filters.page) >= pagesCount}
            onClick={() => {
              // @ts-ignore
              setFilters((prevState) => ({ ...prevState, page: Number(prevState.page) + 1 }));
            }}
          >
            Следующая страница
          </button>
        </div>
      )}
    </div>
  );
};

export default observer(Pagination);
