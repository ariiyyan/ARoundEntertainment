const express = require('express');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json());

// Function to generate a URL for getting a random image from Picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

// Products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100 },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200 },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300 },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150 },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500 },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50 },
];

// Implement the GET API for getting products
app.get('/api/products', (req, res) => {
    // Map through the products and add a dynamic image URL
    const productsWithImages = products.map(product => ({
        ...product,
        imageUrl: fetchImageUrl() // Add random image URL for each product
    }));
    res.json(productsWithImages); // Send the products array as a JSON response
});

// Implement the DELETE API for deleting a product by ID
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(product => product.id !== parseInt(id)); // Filter out the deleted product
    res.status(204).send(); // Respond with no content (204)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
