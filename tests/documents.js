import Documents    from '../src/documents.js';
import Client       from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let documents;
let client;
let callback = () => {};
let options = { limit: 1 };

describe('Documents', () => {
  it('should export a Documents object', () => {
    expect(Documents).to.not.be.null;
    expect(Documents.name).to.equal('Documents');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      documents = new Documents(client);
    });

    it('should be an Documents object', () => {
      expect(documents).to.be.an.instanceof(Documents);
    });

    it('should save the client', () => {
      expect(documents._client).to.be.equal(client);
    });

    describe('.create', () => {
      beforeEach(() => {
        client.post.returns('Promise');
      });

      it('should call the client', () => {
        expect(documents.create('file.pdf', 5000, callback)).to.be.eql('Promise');
        expect(client.post).to.have.been.calledWith('/outbound/documents', { name: 'file.pdf', size: 5000 }, callback);
      });

      it('should accept options', () => {
        expect(documents.create('file.pdf', 5000, { disposition: 'private' }, callback)).to.be.eql('Promise');
        expect(client.post).to.have.been.calledWith('/outbound/documents', { name: 'file.pdf', size: 5000, disposition: 'private' }, callback);
      });

      it('should accept options without a callback', () => {
        expect(documents.create('file.pdf', 5000, { disposition: 'private' })).to.be.eql('Promise');
        expect(client.post).to.have.been.calledWith('/outbound/documents', { name: 'file.pdf', size: 5000, disposition: 'private' }, undefined);
      });

      it('should accept no options and no callback', () => {
        expect(documents.create('file.pdf', 5000)).to.be.eql('Promise');
        expect(client.post).to.have.been.calledWith('/outbound/documents', { name: 'file.pdf', size: 5000 }, undefined);
      });
    });

    describe('.all', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(documents.all(callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/outbound/documents', callback, undefined);
      });

      it('should allow for options', () => {
        documents.all(options, callback);
        expect(client.get).to.have.been.calledWith('/outbound/documents', options, callback);
      });
    });

    describe('.find', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(documents.find(123, callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/outbound/documents/123', callback);
      });
    });

    describe('.cancel', () => {
      beforeEach(() => {
        client.delete.returns('Promise');
      });

      it('should call the client', () => {
        expect(documents.cancel(123, callback)).to.be.eql('Promise');
        expect(client.delete).to.have.been.calledWith('/outbound/documents/123', callback);
      });
    });

    describe('.upload', () => {
      beforeEach(() => {
        client.request.returns('Promise');
      });

      it('should call the client', () => {
        expect(documents.upload(123, 0, 500, 'data', callback)).to.be.eql('Promise');
        expect(client.request).to.have.been.calledWith('POST', '/outbound/documents/123', { Range: 'bytes=0-500' }, 'data', {  }, callback);
      });
    });
  });
});
