class ErrorHandler {
  constructor(emitter, debug) {
    return (error) => {
      if (debug) { console.log(error); } // eslint-disable-line no-console
      emitter.emit('reject', error);
    };
  }
}

export default ErrorHandler;
