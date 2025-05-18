const products = require('../data/products.json');

const searchProducts = (req, res) => {
  try {
    const { q, parsedLimit, parsedSkip } = req.query;
    const searchQuery = q.toLowerCase();

    const searchResults = products
      .map(product => {
        const title = product.title.toLowerCase();
        const brand = product.brand.toLowerCase();
        let score = 0;

        // Score based on title match
        if (title.startsWith(searchQuery)) {
          score += 3; // Highest score for title starts with
        } else if (title.includes(searchQuery)) {
          score += 2; // Medium score for title contains
        }

        // Score based on brand match
        if (brand.startsWith(searchQuery)) {
          score += 2; // High score for brand starts with
        } else if (brand.includes(searchQuery)) {
          score += 1; // Lower score for brand contains
        }

        return { ...product, score };
      })
      .filter(product => product.score > 0) 
      .sort((a, b) => b.score - a.score) // Sort by score
      .slice(parsedSkip, parsedSkip + parsedLimit); // Apply pagination

    // Get total count for pagination
    const totalResults = products.filter(product => {
      const title = product.title.toLowerCase();
      const brand = product.brand.toLowerCase();
      return title.includes(searchQuery) || brand.includes(searchQuery);
    }).length;

    res.json({
      products: searchResults,
      total: totalResults,
      limit: parsedLimit,
      skip: parsedSkip
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: {
        message: 'Error performing search',
        status: 500
      }
    });
  }
};

module.exports = {
  searchProducts
}; 