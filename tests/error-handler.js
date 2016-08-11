import ErrorHandler     from '../src/error-handler.js';

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
      let callback = (error, response) => {
        expect(error).to.be.equal('error');
        expect(response).to.be.null;
        done();
      };
      let handler = new ErrorHandler(callback);
      handler('error');
    });
  });
});
