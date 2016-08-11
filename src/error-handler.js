class ErrorHandler {
  constructor(emitter) {
    return (error) => {
      emitter.emit('reject', error);
    };
  }
}

export default ErrorHandler;
