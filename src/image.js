import fs from 'fs';

class Image {
  constructor(data, contentType) {
    this.data = data;
    this.contentType = contentType;
  }

  extension() {
    if (this.contentType == 'application/pdf') {
      return "pdf";
    } else {
      return "tiff";
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
