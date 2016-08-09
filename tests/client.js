import Client     from '../src/client.js';

import { expect } from 'chai';

describe('Client', () => {
  it('should export a Client object', () => {
    expect(Client).to.not.be.null;
    expect(Client.name).to.equal('Client');
  });
});
