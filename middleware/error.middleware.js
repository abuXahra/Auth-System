function errorMiddleware(err, req, res, next) {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error occured",
  });
  next();
}

module.exports = errorMiddleware;
