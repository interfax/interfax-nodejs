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
      let emitter = new EventEmitter();
      emitter.on('resolve', (result) => {
        expect(result).to.eql({ result: 1 });
        done();
      });

      let handler = new ResponseHandler(emitter);
      let response = new EventEmitter();
      response.headers = { 'content-type' : 'text/json' };

      handler(response);

      response.emit('data', '{ "result" : 1 }');
      response.emit('end');
    });


    it('should process a text response', (done) => {
      let emitter = new EventEmitter();
      emitter.on('resolve', (result) => {
        expect(result).to.eql('Hello World!');
        done();
      });

      let handler = new ResponseHandler(emitter);
      let response = new EventEmitter();
      response.headers = {};

      handler(response);

      response.emit('data', 'Hello World!');
      response.emit('end');
    });

    it('should process a direct error', (done) => {
      let emitter = new EventEmitter();
      emitter.on('reject', (error) => {
        expect(error).to.be.equal('error');
        done();
      });

      let handler = new ResponseHandler(emitter);
      let response = new EventEmitter();
      response.headers = {};

      handler(response);

      response.emit('close', 'error');
    });

    it('should process a status code error', (done) => {
      let emitter = new EventEmitter();
      emitter.on('reject', (error) => {
        expect(error).to.eql({ code: 123 });
        done();
      });

      let handler = new ResponseHandler(emitter);
      let response = new EventEmitter();
      response.headers = { 'content-type' : 'text/json' };
      response.statusCode = 400;

      handler(response);

      response.emit('data', '{ "code": 123 }');
      response.emit('end');
    });

  });
});
