import File       from '../src/file.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let file;
let client;

describe('File', () => {
  it('should export a File object', () => {
    expect(File).to.not.be.null;
    expect(File.name).to.equal('File');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      file = new File(client, 'https://tests.com/test.pdf');
    });

    it('should be an File object', () => {
      expect(file).to.be.an.instanceof(File);
    });

    it('should save the client', () => {
      expect(file._client).to.be.equal(client);
    });
  });
});
