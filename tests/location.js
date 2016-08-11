import Location from '../src/location.js';

import { expect } from 'chai';

let location;
let url = 'https://foobar.com/foo/bar/123';

describe('Location', () => {
  it('should export a Location object', () => {
    expect(Location).to.not.be.null;
    expect(Location.name).to.equal('Location');
  });

  describe('.instance', () => {
    beforeEach(() => {
      location = new Location(url);
    });

    it('should be an Location object', () => {
      expect(location).to.be.an.instanceof(Location);
    });

    it('should have the url', () => {
      expect(location.url).to.be.equal(url);
    });

    it('should extract the ID', () => {
      expect(location.id).to.be.equal('123');
    });
  });
});
