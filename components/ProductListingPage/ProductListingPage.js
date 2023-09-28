import React from 'react';
import Categories from './Categories';

const ProductListingPage = ({ products, categories }) => {
  return (
    <div>
      <h1>Products</h1>
      <Categories categories={categories} /> {/* Use the Categories component */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/product/${product.slug}`}>{product.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListingPage;

