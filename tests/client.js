import Client           from '../src/client.js';
import https            from 'https';
import EventEmitter     from 'events';

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

    it('should accept the username and password as environment variables', () => {
      process.env.INTERFAX_USERNAME = 'jdoe';
      process.env.INTERFAX_PASSWORD = 'test123';

      let client = new Client();
      expect(client).to.be.an.instanceof(Client);

      process.env.INTERFAX_USERNAME = undefined;
      process.env.INTERFAX_PASSWORD =  undefined;
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

  describe('.post', () => {
    beforeEach(() => {
      client = new Client(https, credentials, version);
    });

    it('should make the correct http call', (done) => {
      let _https = sinon.mock(https);

      _https.expects('request').once().withArgs({
        auth: 'foo:bar',
        headers: { 'User-Agent': 'InterFAX Node 1.0' },
        host: 'rest.interfax.net',
        method: 'POST',
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

      client.post('/foo/bar', {limit: 1}, () => {});

      _https.verify();
      _https.restore();
    });
  });


  describe('._promise', () => {
    beforeEach(() => {
      client = new Client(https, credentials, version);
    });

    describe('on resolve', () => {
      it('should call the emitter', (done) => {
        let emitter = new EventEmitter();

        let promise = client._promise(emitter, null);
        promise.then((response) => {
          expect(response).to.eql('result');
          done();
        });
        emitter.emit('resolve', 'result');
      });

      it('should call the callback if it exists', (done) => {
        let emitter = new EventEmitter();

        client._promise(emitter, (error, response) => {
          expect(error).to.be.null;
          expect(response).to.eql('result');
          done();
        });

        emitter.emit('resolve', 'result');
      });
    });

    describe('on reject', () => {
      it('should call the emitter', (done) => {
        let emitter = new EventEmitter();

        let promise = client._promise(emitter, null);
        promise.catch((error) => {
          expect(error).to.eql('error');
          done();
        });
        emitter.emit('reject', 'error');
      });

      it('should call the callback if it exists', (done) => {
        let emitter = new EventEmitter();

        client._promise(emitter, (error, response) => {
          expect(response).to.be.null;
          expect(error).to.eql('error');
          done();
        });

        emitter.emit('reject', 'error');
      });
    });
  });
});
