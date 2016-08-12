import Delivery    from '../src/delivery.js';
import Client      from '../src/client.js';
import Documents   from '../src/documents.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';
import EventEmitter     from 'events';

chai.use(sinonChai);

let delivery;
let client;
let documents;
let spy;
let promise;

describe('Delivery', () => {
  it('should export a Delivery object', () => {
    expect(Delivery).to.not.be.null;
    expect(Delivery.name).to.equal('Delivery');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      documents  = sinon.createStubInstance(Documents);
      delivery = new Delivery(client, documents);
    });

    it('should be an Delivery object', () => {
      expect(delivery).to.be.an.instanceof(Delivery);
    });

    it('should save the client', () => {
      expect(delivery._client).to.be.equal(client);
    });

    it('should save the Documents client', () => {
      expect(delivery._documents).to.be.equal(documents);
    });

    describe('.deliver', () => {
      beforeEach(() => {
        let emitter = new EventEmitter();
        promise = client._promise(emitter, null);
        spy = client.request.returns(promise);
      });

      it('should call the client with the right params', () => {
        delivery.deliver({
          faxNumber: '1234567890',
          file: 'tests/test.pdf'
        }).then(() => {
          expect(client.request).to.have.been.called;
          expect(spy.args[0][0]).to.eql('POST');
          expect(spy.args[0][1]).to.eql('/outbound/faxes');
          expect(spy.args[0][2]['Content-Length']).to.eql(9256);
          expect(spy.args[0][3].length).to.eql(7);
          expect(spy.args[0][4]['faxNumber']).to.eql('1234567890');
          expect(spy.args[0][4]['file']).to.eql(undefined);
        });
      });

      it('should accept a list of files', () => {
        delivery.deliver({
          faxNumber: '1234567890',
          files: ['tests/test.pdf', 'tests/test.html']
        }).then(() => {
          expect(client.request).to.have.been.called;
          expect(spy.args[0][0]).to.eql('POST');
          expect(spy.args[0][1]).to.eql('/outbound/faxes');
          expect(spy.args[0][2]['Content-Length']).to.eql(9459);
          expect(spy.args[0][3].length).to.eql(13);
          expect(spy.args[0][4]['faxNumber']).to.eql('1234567890');
          expect(spy.args[0][4]['files']).to.eql(undefined);
        });
      });

      it('should require a fax number', () => {
        expect(() => {
          delivery.deliver({
            files: ['tests/test.pdf', 'tests/test.html']
          });
        }).to.throw(Error);
      });

      it('should require a file or files', () => {
        expect(() => {
          delivery.deliver({
            faxNumber: '1234567890'
          });
        }).to.throw(Error);
      });
    });
  });
});
