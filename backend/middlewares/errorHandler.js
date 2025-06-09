const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  const statusCode = res.status != 200 ? res.status : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something Went Wrong",
  });
};

module.exports = errorHandler;
