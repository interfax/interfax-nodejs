import File       from '../src/file.js';
import Documents  from '../src/documents.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';
import fs               from 'fs';
import Promise          from 'bluebird';

chai.use(sinonChai);

let documents;
let file;
let upload;
let doc;

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

    it('should process binary files', (done) => {
      let data = fs.readFileSync('tests/test.pdf');
      let file = new File(documents, data, { mimeType: 'application/pdf' });
      expect(file.header).to.be.eql('Content-Type: application/pdf');
      expect(file.body.length).to.be.eql(9147);
      file.onReady((ready) => {
        expect(ready).to.be.true;
        done();
      });
    });

    it('should process urls', (done) => {
      let file = new File(documents, 'http://foobar.com/test.pdf');
      expect(file.header).to.be.eql('Content-Location: http://foobar.com/test.pdf');
      expect(file.body).to.be.eql(null);
      file.onReady((ready) => {
        expect(ready).to.be.true;
        done();
      });
    });

    it('should process paths', (done) => {
      let file = new File(documents, 'tests/test.pdf');
      expect(file.header).to.be.eql('Content-Type: application/pdf');
      expect(file.body.length).to.be.eql(9147);
      file.onReady((ready) => {
        expect(ready).to.be.true;
        done();
      });
    });

    it('should auto upload large files', () => {
      let promise = new Promise(() => {});
      let spy = documents.create.returns(promise);
      let file = new File(documents, 'tests/test.pdf', { chunkSize: 500 });

      expect(file._ready).to.be.undefined;

      expect(documents.create).to.have.been.called;
      expect(spy.args[0][0]).to.be.a('string');
      expect(spy.args[0][1]).to.eql(9147);
    });

  });

  describe('_startUpload', () => {
    beforeEach(() => {
      let promise = new Promise(() => {});
      documents.create.returns(promise);
      file = new File(documents, 'tests/test.pdf', { chunkSize: 500 });

      upload = sinon.stub(file, '_upload').returns(() => {});
      doc = {
        url: 'https://foobar.com/document/123'
      };

      file._startUpload('__data__')(doc);
    });

    afterEach(() => {
      upload.restore();
    });

    it ('should set the header', () => {
      expect(file.header).to.eql('Content-Location: https://foobar.com/document/123');
    });

    it ('should clear the body', () => {
      expect(file.body).to.be.null;
    });

    it ('should start the upload of the first chunk', () => {
      expect(upload).to.have.been.calledWith(0, doc, '__data__');
    });
  });

  describe('_upload', () => {
    it ('trigger the end of the upload if the end has been reached', () => {
      let result = file._upload(1000, {}, '__data__')();
      expect(result).to.be.true;
    });

    it ('should upload the next chunk', () => {
      let _spy = documents.upload.returns(new Promise(() => {}));
      file._upload(0, { id: '123' }, '__data__')();
      expect(_spy).to.be.calledWith('123', 0, 7, '__data__');
    });
  });

  describe('_triggerReady', () => {
    beforeEach(() => {
      file = new File(documents, 'tests/test.pdf');
      file.ready = false;
    });

    it ('should set ready to true if response is true', () => {
      file._triggerReady(true);
      expect(file.ready).to.be.true;
    });

    it ('should set ready to false if response is false', () => {
      file._triggerReady(false);
      expect(file.ready).to.be.false;
    });

    it ('should set ready to false if response is an object', () => {
      file._triggerReady({});
      expect(file.ready).to.be.false;
    });

    it ('should set ready to false if response is undefined', () => {
      file._triggerReady(undefined);
      expect(file.ready).to.be.false;
    });

    it ('should call all callbacks with the response', (done) => {
      file._callbacks.push((response) => {
        expect(response).to.be.true;
        done();
      });

      file._triggerReady(true);
    });
  });
});
