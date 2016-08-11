import Image    from './image';
import Location from './location';

class ResponseHandler {
  constructor(emitter) {
    return (response) => {
      let result = '';
      let isJson      = response.headers['content-type'] == 'text/json';
      let isImage     = response.headers['content-type'] == 'image/tiff';
      let isLocation  = response.headers['location'] !== undefined;

      response.on('data', function(chunk) {
        result += chunk;
      });

      response.on('end', function() {
        if (isLocation) { result = new Location(response.headers['location']); }
        else if (isJson) { result = JSON.parse(result); }
        else if (isImage) { result = new Image(result); }

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
