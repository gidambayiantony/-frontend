import { Box, List, ListItem, Link } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Categories from './Categories'; // Import the Categories component

function Homepage() {
  const { data: categories } = useQuery('homepageCategories', fetchHomepageCategories);

  return (
    <Box>
      <h1>Homepage Categories</h1>
      <Categories categories={categories} /> {/* Use the Categories component */}
    </Box>
  );
}

async function fetchHomepageCategories() {
  const response = await fetch('/api/homepage-categories');
  const data = await response.json();
  return data;
}

export default Homepage;

