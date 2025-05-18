# Product Search API

A RESTful API for product search with scoring and pagination capabilities.

## Setup Instructions

1. **Prerequisites**:
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**:
   ```bash
   # Install dependencies
   npm install
   ```

3. **Running the Server**:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```
   Server will start on http://localhost:3000

## Approach & Thought Process

1. **API Design**:
   - RESTful endpoint design
   - Query parameter based search and pagination
   - Consistent response format
   - Clear error handling

2. **Search Implementation**:
   - Case-insensitive search
   - Scoring system for result relevance:
     - Title matches (higher priority)
     - Brand matches (lower priority)
   - Results sorted by relevance score

3. **Pagination Strategy**:
   - Skip/limit based pagination
   - Applied after scoring and sorting
   - Maintains consistent ordering across pages
   - Returns total count for UI pagination

4. **Error Handling**:
   - Input validation
   - Clear error messages
   - Proper HTTP status codes
   - Try-catch blocks for robustness

## API Testing

### Search Products

```bash
# Basic search
curl "http://localhost:3000/products/search?q=phone"

# Search with pagination
curl "http://localhost:3000/products/search?q=phone&limit=5&skip=0"

# Search with different limit
curl "http://localhost:3000/products/search?q=phone&limit=20&skip=0"
```

### Response Format
```json
{
  "products": [
    {
      "id": 1,
      "title": "iPhone 12",
      "brand": "Apple",
      "category": "smartphones",
      "price": 999
    }
  ],
  "total": 100,
  "limit": 10,
  "skip": 0
}
```

### Error Cases
```bash
# Query too short (min 2 chars)
curl "http://localhost:3000/products/search?q=a"

# Invalid limit
curl "http://localhost:3000/products/search?q=phone&limit=0"

# Invalid skip
curl "http://localhost:3000/products/search?q=phone&skip=-1"
```

### Testing Tips
1. Start with basic search
2. Test pagination with different limits
3. Try edge cases (empty results, last page)
4. Test error handling
5. Verify response format

## Project Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── productController.js
│   ├── data/
│   │   └── products.json
│   └── server.js
├── package.json
└── README.md
``` 