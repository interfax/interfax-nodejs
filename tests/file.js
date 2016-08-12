import File       from '../src/file.js';
import Documents  from '../src/documents.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';
import fs               from 'fs';
import https            from 'https';

chai.use(sinonChai);

let documents;

describe('File', () => {
  it('should export a File object', () => {
    expect(File).to.not.be.null;
    expect(File.name).to.equal('File');
  });

  describe('.instance', () => {
    beforeEach(() => {
      documents  = sinon.createStubInstance(Documents);
    });

    it('should be an File object', () => {
      let file = new File(documents, 'https://tests.com/test.pdf');
      expect(file).to.be.an.instanceof(File);
    });

    it('should save the documents object', () => {
      let file = new File(documents, 'https://tests.com/test.pdf');
      expect(file._documents).to.be.equal(documents);
    });

    it('should process binary files', () => {
      let data = fs.readFileSync('tests/test.pdf');
      let file = new File(documents, data, { mimeType: 'application/pdf' });
      expect(file.header).to.be.eql('Content-Type: application/pdf');
      expect(file.body.length).to.be.eql(9147);
    });

    it('should process urls', () => {
      let file = new File(documents, 'http://foobar.com/test.pdf');
      expect(file.header).to.be.eql('Content-Location: http://foobar.com/test.pdf');
      expect(file.body).to.be.eql(null);
    });

    it('should process paths', () => {
      let file = new File(documents, 'tests/test.pdf');
      expect(file.header).to.be.eql('Content-Type: application/pdf');
      expect(file.body.length).to.be.eql(9147);
    });

    it('should auto upload large files', () => {
      let client = new Client(https, {username: 'username', password: 'password'});
      let documents = new Documents(client);

      let _create = sinon.stub(documents, 'create');
      let _upload = sinon.stub(documents, 'upload');

      let file;

      _create.returns({
        then: (callback) => {
          callback({
            id: '123',
            url: 'http://foo.com/123'
          });
        }
      });

      _upload.returns({
        then: (callback) => {
          callback();
        }
      });

      file = new File(documents, './tests/test.pdf', { chunkSize: 5000 });
      expect(file.header).to.be.eql('Content-Location: http://foo.com/123');
      expect(file.body).to.be.eql(null);
    });

  });
});
