import Client                from '../src/client.js';
import https        from 'https';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

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
      client = new Client(https, credentials, version);
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

  describe('.get', () => {
    beforeEach(() => {
      client = new Client(https, credentials, version);
    });

    it('should make the correct http call', (done) => {
      let _https = sinon.mock(https);

      _https.expects('request').once().withArgs({
        auth: 'foo:bar',
        headers: { 'User-Agent': 'InterFAX Node 1.0' },
        host: 'rest.interfax.net',
        method: 'GET',
        path: '/foo/bar?limit=1',
        port: 443
      }).returns({
        on: function(_, handler){
          expect(handler).to.be.an.instanceof(Function);
        },
        end: function(){
          done();
        }
      });

      client.get('/foo/bar', {limit: 1}, () => {});

      _https.verify();
      _https.restore();
    });
  });
});
