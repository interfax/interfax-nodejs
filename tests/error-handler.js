import ErrorHandler     from '../src/error-handler.js';
import EventEmitter     from 'events';

import { expect } from 'chai';

describe('ErrorHandler', () => {
  it('should export a ErrorHandler object', () => {
    expect(ErrorHandler).to.not.be.null;
    expect(ErrorHandler.name).to.equal('ErrorHandler');
  });

  describe('.instance', () => {
    it('should be an Function', () => {
      let handler = new ErrorHandler();
      expect(handler).to.be.an.instanceof(Function);
    });

    it('should should pass through an error', (done) => {
      let emitter = new EventEmitter();
      emitter.on('reject', (error) => {
        expect(error).to.eql('error');
        done();
      });

      let handler = new ErrorHandler(emitter);
      handler('error');
    });
  });
});
