import ResponseHandler     from '../src/response-handler.js';
import EventEmitter        from 'events';

import { expect } from 'chai';

describe('ResponseHandler', () => {
  it('should export a ResponseHandler object', () => {
    expect(ResponseHandler).to.not.be.null;
    expect(ResponseHandler.name).to.equal('ResponseHandler');
  });

  describe('.instance', () => {
    it('should be an Function', () => {
      let handler = new ResponseHandler();
      expect(handler).to.be.an.instanceof(Function);
    });

    it('should process a json response', (done) => {
      let callback = (error, response) => {
        expect(response).to.be.eql({ result: 1 });
        expect(error).to.be.null;
        done();
      };

      let handler = new ResponseHandler(callback);
      let response = new EventEmitter();
      response.headers = { 'content-type' : 'text/json' };

      handler(response);

      response.emit('data', '{ "result" : 1 }');
      response.emit('end');
    });


    it('should process a text response', (done) => {
      let callback = (error, response) => {
        expect(response).to.be.eql('Hello World!');
        expect(error).to.be.null;
        done();
      };

      let handler = new ResponseHandler(callback);
      let response = new EventEmitter();
      response.headers = {};

      handler(response);

      response.emit('data', 'Hello World!');
      response.emit('end');
    });

    it('should process an error', (done) => {
      let callback = (error, response) => {
        expect(error).to.be.equal('error');
        expect(response).to.be.null;
        done();
      };

      let handler = new ResponseHandler(callback);
      let response = new EventEmitter();
      response.headers = {};

      handler(response);

      response.emit('close', 'error');
    });

  });
});
