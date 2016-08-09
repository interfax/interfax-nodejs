import Account     from './account';
import Client      from './client';
import Outbound    from './outbound';

import library     from '../package.json';

class InterFAX {

  constructor(credentials) {
    let client = new Client(credentials, library.version);

    this.account =  new Account(client);
    this.outbound = new Outbound(client);
  }
}

export default InterFAX;
