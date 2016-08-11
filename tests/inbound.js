import Inbound   from '../src/inbound.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let inbound;
let client;
let callback = () => {};
let options = { limit: 1 };

describe('Inbound', () => {
  it('should export a Inbound object', () => {
    expect(Inbound).to.not.be.null;
    expect(Inbound.name).to.equal('Inbound');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      inbound = new Inbound(client);
    });

    it('should be an Inbound object', () => {
      expect(inbound).to.be.an.instanceof(Inbound);
    });

    it('should save the client', () => {
      expect(inbound._client).to.be.equal(client);
    });

    describe('.all', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(inbound.all(callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/inbound/faxes', callback, undefined);
      });

      it('should allow for options', () => {
        inbound.all(options, callback);
        expect(client.get).to.have.been.calledWith('/inbound/faxes', options, callback);
      });
    });

    describe('.find', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(inbound.find(123, callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/inbound/faxes/123', callback);
      });
    });

    describe('.image', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(inbound.image(123, callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/inbound/faxes/123/image', callback);
      });
    });

    describe('.emails', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(inbound.emails(123, callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/inbound/faxes/123/emails', callback);
      });
    });
  });
});
