const jwt = require('jsonwebtoken');
const createError = require('./createError');

// authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    const error = createError({
      message: 'No token provided',
      statusCode: 403,
    });

    next(error);
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      const error = createError({
        message: 'Failed to authenticate token',
        statusCode: 500,
        err,
      });

      return next(error);
    }

    req.userId = decoded.id;
    return next();
  });
};

module.exports = authenticateToken;
