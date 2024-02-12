import APIError from "../utils/APIError.js";

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || "Internal Server Error",
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack
  });
};

const notFound = (req, res, next) => {
    next(new APIError(`Route not found: ${req.originalUrl}`, 404));
  };


export { errorHandler, notFound };
