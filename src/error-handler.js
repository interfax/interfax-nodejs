function errorHandler(callback) {

  return function(error) {
    callback(error, null);
  };
}

export default errorHandler;
