// components/Menu.jsx
import React from 'react';
import Link from 'next/link';

function Menu() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/cart">Cart</Link>
    </nav>
  );
}

export default Menu;

