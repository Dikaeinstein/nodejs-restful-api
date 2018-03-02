const createError = ({ message, statusCode, err = null }) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.stack = err;
  return error;
};

module.exports = createError;
