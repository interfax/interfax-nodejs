import Image from '../src/image.js';

import { expect } from 'chai';
import fs         from 'fs';

let image;

describe('Image', () => {
  it('should export a Image object', () => {
    expect(Image).to.not.be.null;
    expect(Image.name).to.equal('Image');
  });

  describe('.instance', () => {
    beforeEach(() => {
      image = new Image('data', 'contentType');
    });

    it('should be an Image object', () => {
      expect(image).to.be.an.instanceof(Image);
    });

    it('should have the data', () => {
      expect(image.data).to.be.equal('data');
    });

    it('should have the content type', () => {
      expect(image.contentType).to.be.equal('contentType');
    });


    describe('.save', () => {
      it('should write out the data', () => {
        let writeFileSync = fs.writeFileSync;
        fs.writeFileSync = function(filename, data){
          expect(filename).to.equal('file.tiff');
          expect(data).to.equal('data');
        };
        image.save('file.tiff');
        fs.writeFileSync = writeFileSync;
      });
    });

    describe('.extension', () => {
      it('should return the correct file extension', () => {
        expect(image.extension()).to.equal('tiff');
      });
    });
  });
});
