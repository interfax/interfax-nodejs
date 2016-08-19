import File       from '../src/file.js';
import Files      from '../src/files.js';
import Documents  from '../src/documents.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let files;
let documents;

describe('Files', () => {
  it('should export a Files object', () => {
    expect(Files).to.not.be.null;
    expect(Files.name).to.equal('Files');
  });

  describe('.instance', () => {
    beforeEach(() => {
      documents  = sinon.createStubInstance(Documents);
      files = new Files(documents);
    });

    it('should be an Files object', () => {
      expect(files).to.be.an.instanceof(Files);
    });

    it('should save the documents client', () => {
      expect(files._documents).to.be.equal(documents);
    });

    describe('.create', () => {
      it('should return a new file', (done) => {
        files.create('https://foobar.com/file.pdf').then((file) => {
          expect(file).to.be.an.instanceof(File);
          expect(file._documents).to.eql(documents);
          done();
        });
      });
    });
  });
});
