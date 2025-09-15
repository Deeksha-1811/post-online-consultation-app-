const errorHandler = (err, req, res, next) => {
  // Log full error stack (useful for debugging)
  console.error(err.stack);

  // Send response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.isOperational ? err.message : "Server Error"
  });
};

module.exports = errorHandler;
