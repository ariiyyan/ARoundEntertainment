import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products'); // Updated port
      console.log('Fetched Products:', response.data); // Log the response data for debugging
      setProducts(response.data); // Set the products state with fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to delete a product by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`); // Corrected the URL
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h6">${product.price}</Typography>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
