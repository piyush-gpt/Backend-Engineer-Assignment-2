const express = require('express');
const cors = require('cors');
const { searchProducts } = require('./controllers/productController');
const { validateSearchQuery } = require('./middleware/validation');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/products/search', validateSearchQuery, searchProducts);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 