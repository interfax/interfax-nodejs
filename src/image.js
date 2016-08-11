import fs from 'fs';

class Image {
  constructor(data) {
    this.data = data;
  }

  save(filename) {
    fs.writeFileSync(
      filename,
      this.data
    );
  }
}

export default Image;
