import InterFAX     from '../src/interfax.js';
import Account      from '../src/account.js';
import Client       from '../src/client.js';
import Outbound     from '../src/outbound.js';
import Inbound      from '../src/inbound.js';
import Delivery     from '../src/delivery.js';
import Files        from '../src/files.js';
import Documents    from '../src/documents.js';

import { expect } from 'chai';

let interfax;
let credentials = {
  username: 'foo',
  password: 'bar'
};

describe('InterFAX', () => {
  it('should export a InterFAX object', () => {
    expect(InterFAX).to.not.be.null;
    expect(InterFAX.name).to.equal('InterFAX');
  });

  describe('.instance', () => {
    beforeEach(() => {
      interfax = new InterFAX(credentials);
    });

    it('should be an InterFax object', () => {
      expect(interfax).to.be.an.instanceof(InterFAX);
    });

    it('should initialise the generic client', () => {
      expect(interfax._client).to.be.an.instanceof(Client);
      expect(interfax._client._credentials).to.equal(credentials);
    });

    it('should initialise the Account client', () => {
      expect(interfax.account).to.be.an.instanceof(Account);
    });

    it('should initialise the Delivery client', () => {
      expect(interfax._delivery).to.be.an.instanceof(Delivery);
    });

    it('should initialise the Outbound client', () => {
      expect(interfax.outbound).to.be.an.instanceof(Outbound);
    });

    it('should initialise the Inbound client', () => {
      expect(interfax.inbound).to.be.an.instanceof(Inbound);
    });

    it('should initialise the Files client', () => {
      expect(interfax.files).to.be.an.instanceof(Files);
      expect(interfax.files._documents).to.be.an.instanceof(Documents);
    });
  });
});
