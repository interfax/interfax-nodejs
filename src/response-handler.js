class ResponseHandler {
  constructor(emitter) {
    return (response) => {
      let result = '';
      let isJson = response.headers['content-type'] == 'text/json';

      response.on('data', function(chunk) {
        result += chunk;
      });

      response.on('end', function() {
        if (isJson) { result = JSON.parse(result); }

        if (response.statusCode >= 300) {
          emitter.emit('reject', result);
        } else {
          emitter.emit('resolve', result);
        }
      });

      response.on('close', function(error) {
        emitter.emit('reject', error);
      });
    };
  }
}

export default ResponseHandler;
