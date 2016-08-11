import Account    from '../src/account.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let account;
let client;
let callback = () => {};

describe('Account', () => {
  it('should export a Account object', () => {
    expect(Account).to.not.be.null;
    expect(Account.name).to.equal('Account');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      account = new Account(client);
    });

    it('should be an Account object', () => {
      expect(account).to.be.an.instanceof(Account);
    });

    it('should save the client', () => {
      expect(account._client).to.be.equal(client);
    });

    describe('.balance', () => {
      beforeEach(() => {
        client.get.returns('Promise');
      });

      it('should call the client', () => {
        expect(account.balance(callback)).to.be.eql('Promise');
        expect(client.get).to.have.been.calledWith('/accounts/self/ppcards/balance', callback);
      });
    });
  });
});
