import fs from 'fs';

class Image {
  constructor(data, contentType) {
    /** @deprecated use `dataBuffer` instead of `data` */
    this.data = data.toString();

    this.dataBuffer = Buffer.from(data);
    this.contentType = contentType;

    if (this.contentType == 'application/pdf') {
      this.extension = 'pdf';
    } else {
      this.extension = 'tiff';
    }
  }

  save(filename) {
    fs.writeFileSync(
      filename,
      this.dataBuffer
    );
  }
}

export default Image;
