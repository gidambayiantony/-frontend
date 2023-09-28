// components/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';

function CartPage() {
  const { cart } = useSelector((state) => state.cart); // Assuming you have a Redux store for the cart
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  // Calculate the total price of items in the cart
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const handleCheckout = () => {
    // Perform actions for checkout, e.g., redirect to checkout page
    router.push('/checkout');
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <div>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <Box mt={4}>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <Button
          colorScheme="blue"
          onClick={handleCheckout}
          isDisabled={cart.length === 0} // Disable checkout if the cart is empty
        >
          Checkout
        </Button>
      </Box>
    </div>
  );
}

export default CartPage;

