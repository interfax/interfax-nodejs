class ResponseHandler {
  constructor(callback) {
    return (response) => {
      let result = '';
      let isJson = response.headers['content-type'] == 'text/json';

      response.on('data', function(chunk) {
        result += chunk;
      });

      response.on('end', function() {
        if (isJson) result = JSON.parse(result);

        callback(null, result);
      });

      response.on('close', function(error) {
        callback(error, null);
      });
    };
  }
}

export default ResponseHandler;
