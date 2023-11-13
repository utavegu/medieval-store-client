import { observer } from 'mobx-react-lite';
import { productsSlice } from '@/store/products.slice';

const ProductsList = () => {
  if (productsSlice.isLoading) {
    return <div>Загрузка товаров...</div>;
  }

  if (productsSlice.error) {
    return <div>Ошибка загрузки товаров! Попробуйте позже</div>;
  }

  return (
    <>
      {!!productsSlice?.products?.products?.length &&
        productsSlice.products.products.map((product, i) => (
          <div key={i}>
            {product.productName} {product.price}
          </div>
        ))}
    </>
  );
};

export default observer(ProductsList);
