class Location {
  constructor(url) {
    this.url = url;

    let parts = url.split('/');
    this.id = parts[parts.length-1];
  }
}

export default Location;
