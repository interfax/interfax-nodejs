import Image    from './image';
import Location from './location';

class ResponseHandler {
  constructor(emitter, debug) {
    return (response) => {
      if (debug) { console.log(response); } // eslint-disable-line no-console

      let isJson      = response.headers['content-type'] == 'text/json';
      let isTiff      = response.headers['content-type'] == 'image/tiff';
      let isPdf       = response.headers['content-type'] == 'application/pdf';
      let isImage     = isTiff || isPdf;
      let result      = isImage ? [] : '';

      let isLocation  = response.headers['location'] !== undefined;

      response.on('data', function(chunk) {
        if (isImage) {
          result.push(chunk);
        } else {
          result += chunk;
        }
      });

      response.on('end', function() {
        if (debug) { console.log(result); } // eslint-disable-line no-console

        if (isLocation) { result = new Location(response.headers['location']); }
        else if (isJson && result.length > 0) { result = JSON.parse(result); }
        else if (isJson && result.length == 0) { result = null; }
        else if (isImage) {
          const data = Buffer.concat(result);
          result = new Image(data, response.headers['content-type']);
        }

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
module.exports = exports['default'];
