export const errorHandler = async (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  // check for specific errors
  if (err.name === "castError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Not Found resource";
  }

  // additional error handling Logic can be added here

  // send the error response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const routeNotFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl} route`);

  res.status(404);
  next(error);
};
