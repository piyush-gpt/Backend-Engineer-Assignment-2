const validateSearchQuery = (req, res, next) => {
  const { q, limit, skip } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({
      error: {
        message: 'Search query must be at least 2 characters long',
        status: 400
      }
    });
  }

  const parsedLimit = parseInt(limit);
  if (limit && (isNaN(parsedLimit) || parsedLimit < 1)) {
    return res.status(400).json({
      error: {
        message: 'Limit must be a positive number',
        status: 400
      }
    });
  }

  const parsedSkip = parseInt(skip);
  if (skip && (isNaN(parsedSkip) || parsedSkip < 0)) {
    return res.status(400).json({
      error: {
        message: 'Skip must be a non-negative number',
        status: 400
      }
    });
  }

  req.query.parsedLimit = parsedLimit || 10;
  req.query.parsedSkip = parsedSkip || 0;

  next();
};

module.exports = {
  validateSearchQuery
}; 