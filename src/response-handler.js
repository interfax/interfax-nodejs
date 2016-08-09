function responseHandler(callback) {
  
  return function(response) {
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
      callback(error);
    });
  };
}

export default responseHandler;
