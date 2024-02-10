class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.statusText =
      statusCode == 401
        ? "unauthorized"
        : statusCode == 403
        ? "forbidden"
        : statusCode == 404
        ? "not found"
        : "Internal Server Error.";
  }
}

export default APIError;
