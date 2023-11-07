'use client'; // TODO: Очень интересно... Где тут mobx?

import Wrapper from '@/layouts/Wrapper/Wrapper';
import Filters from '@/components/Filters/Filters';
import ProductsList from '@/components/ProductsList/ProductsList';

const Catalog = () => {
  return (
    <Wrapper>
      <Filters />
      <ProductsList />
    </Wrapper>
  );
};

export default Catalog;
