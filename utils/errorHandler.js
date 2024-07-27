export const errorhandler = async (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;
  // Check for specific errors
  if (err.name === "castError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Not Found Resource !";
  }

  // Additional error handling logic can be added here

  // Send the error response
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const handleNotFound = (req, res, next) => {
  //   sendError(res, `not found ${req.originalUrl}`, 404);0
  const error = new Error(`not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};
