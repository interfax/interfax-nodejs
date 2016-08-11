class ErrorHandler {
  constructor(callback) {
    return (error) => {
      callback(error, null);
    };
  }
}

export default ErrorHandler;
