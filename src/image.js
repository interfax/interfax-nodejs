import fs from 'fs';

class Image {
  constructor(data, contentType) {
    this.data = data;
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
      this.data
    );
  }
}

export default Image;
