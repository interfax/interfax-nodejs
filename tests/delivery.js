import Delivery    from '../src/delivery.js';
import Client      from '../src/client.js';
import Documents   from '../src/documents.js';
import File        from '../src/file.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';
import Promise          from 'bluebird';
// import EventEmitter     from 'events';

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
      it('should call generate the objects', () => {
        spy = sinon.stub(delivery, '_generateFileObjects');

        delivery.deliver({
          faxNumber: '1234567890',
          file: 'tests/test.pdf'
        });

        expect(spy).to.have.been.called;
        expect(spy.args[0][0]).to.include('tests/test.pdf');
        expect(spy.args[0][1]).to.be.a('function');
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

    describe('._deliverFiles', () => {
      beforeEach(() => {
        promise = new Promise(() => {});
        spy = client.request.returns(promise);
      });

      it('should accept a list of files', () => {
        let files = [new File(client, 'tests/test.pdf')];
        let result = delivery._deliverFiles({faxNumber: '1234567890'})(null, files);

        expect(result).to.be.an.instanceof(Promise);

        expect(client.request).to.have.been.called;
        expect(spy.args[0][0]).to.eql('POST');
        expect(spy.args[0][1]).to.eql('/outbound/faxes');
        expect(spy.args[0][2]['Content-Length']).to.eql(9256);
        expect(spy.args[0][3].length).to.eql(7);
        expect(spy.args[0][4]['faxNumber']).to.eql('1234567890');
        expect(spy.args[0][4]['files']).to.eql(undefined);
      });

    });
  });
});
