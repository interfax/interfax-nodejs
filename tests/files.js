import File       from '../src/file.js';
import Files      from '../src/files.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let files;
let file;
let client;

describe('Files', () => {
  it('should export a Files object', () => {
    expect(Files).to.not.be.null;
    expect(Files.name).to.equal('Files');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      files = new Files(client);
    });

    it('should be an Files object', () => {
      expect(files).to.be.an.instanceof(Files);
    });

    it('should save the client', () => {
      expect(files._client).to.be.equal(client);
    });

    describe('.create', () => {
      beforeEach(() => {
        file = files.create('https://foobar.com/file.pdf');
      });

      it('should return a new file', () => {
        expect(file).to.be.an.instanceof(File);
        expect(file._client).to.eql(client);
      });
    });
  });
});
