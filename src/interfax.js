import Account     from './account';
import Client      from './client';
import Outbound    from './outbound';
import Inbound     from './inbound';
import Documents   from './documents';

import library     from '../package.json';
import https       from 'https';


class InterFAX {

  constructor(credentials) {
    this.client = new Client(https, credentials, library.version);

    this.account   = new Account(this.client);
    this.outbound  = new Outbound(this.client);
    this.inbound   = new Inbound(this.client);
    this.documents = new Documents(this.client);
  }
}

export default InterFAX;
