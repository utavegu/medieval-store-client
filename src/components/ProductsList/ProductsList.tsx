import { observer } from 'mobx-react-lite';
import { productsSlice } from '@/store/products.slice';

const ProductsList = () => {
  if (productsSlice.isLoading) {
    return <div>Загрузка товаров...</div>;
  }

  if (productsSlice.error) {
    return <div>Ошибка загрузки товаров! Попробуйте позже</div>;
  }

  // TODO: обработать вариант, что товаров по такой выборке просто нет - "такие товары не найдены" (если пустой массив)
  return (
    <>
      {productsSlice.products?.map((product, i) => (
        <div key={i}>
          {product.productName} {product.price}
        </div>
      ))}
    </>
  );
};

export default observer(ProductsList);
