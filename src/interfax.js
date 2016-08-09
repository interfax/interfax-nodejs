import Account     from './account';
import Client      from './client';
import Outbound    from './outbound';

import library     from '../package.json';

class InterFAX {

  constructor(credentials) {
    this.client = new Client(credentials, library.version);

    this.account =  new Account(this.client);
    this.outbound = new Outbound(this.client);
  }
}

export default InterFAX;
