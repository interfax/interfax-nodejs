import Outbound   from '../src/outbound.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let outbound;
let client;
let callback = () => {};
let options = { limit: 1 };

describe('Outbound', () => {
  it('should export a Outbound object', () => {
    expect(Outbound).to.not.be.null;
    expect(Outbound.name).to.equal('Outbound');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      outbound = new Outbound(client);
    });

    it('should be an Outbound object', () => {
      expect(outbound).to.be.an.instanceof(Outbound);
    });

    it('should save the client', () => {
      expect(outbound._client).to.be.equal(client);
    });

    describe('.all', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(outbound.all(callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/outbound/faxes', callback, undefined);
      });

      it('should allow for options', () => {
        outbound.all(options, callback);
        expect(client.get).to.have.been.calledWith('/outbound/faxes', options, callback);
      });
    });

    describe('.completed', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(outbound.completed([1,2], callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/outbound/faxes/completed', { ids: [1,2] } , callback);
      });
    });

    describe('.find', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(outbound.find(123, callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/outbound/faxes/123', callback);
      });
    });

    describe('.image', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(outbound.image(123, callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/outbound/faxes/123/image', callback);
      });
    });
  });
});
