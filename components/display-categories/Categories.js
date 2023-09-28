// Categories.js
import React from 'react';

const Categories = ({ categories }) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <a href={`/category/${category.slug}`}>{category.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default Categories;

