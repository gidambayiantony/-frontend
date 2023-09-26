import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

function FlashSaleDiscountTicker() {
  const { data: flashSale } = useQuery('flashSale', fetchFlashSale);

  return (
    <Box>
      <p>{flashSale?.discount}% off</p>
    </Box>
  );
}

// Fetch flash sale data from an API endpoint
async function fetchFlashSale() {
  const response = await fetch('/api/flash-sale'); // Replace with  API endpoint
  const data = await response.json();
  return data;
}

export default FlashSaleDiscountTicker;

