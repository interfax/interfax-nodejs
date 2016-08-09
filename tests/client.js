import Client       from '../src/client.js';

import { expect } from 'chai';

let client;
let credentials = {
  username: 'foo',
  password: 'bar'
};
let version = '1.0';

describe('Client', () => {
  it('should export a Client object', () => {
    expect(Client).to.not.be.null;
    expect(Client.name).to.equal('Client');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client = new Client(credentials, version);
    });

    it('should be an Client object', () => {
      expect(client).to.be.an.instanceof(Client);
    });

    it('should save the credentials', () => {
      expect(client._credentials).to.be.equal(credentials);
    });

    it('should save the version', () => {
      expect(client._version).to.be.equal(version);
    });

    it('should raise if the username is missing', () => {
      expect(() => {
        new Client({password: 'bar'});
      }).to.throw(Error);
    });

    it('should raise if the password is missing', () => {
      expect(() => {
        new Client({username: 'foo'});
      }).to.throw(Error);
    });
  });
});
