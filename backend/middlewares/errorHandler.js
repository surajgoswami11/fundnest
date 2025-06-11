const errorHandler = (err, req, res, next) => {
  console.error("Error", err.message);

  const statuscode = err.statusCode || 500;

  res.status(statuscode).json({
    success: false,
    message: err.message || "Something Went Wrong",
  });
};

module.exports = errorHandler;
