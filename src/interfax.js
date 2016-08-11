import Account     from './account';
import Client      from './client';
import Outbound    from './outbound';
import Inbound     from './inbound';
import Documents   from './documents';
import Files       from './files';
import Delivery    from './delivery';

import library     from '../package.json';
import https       from 'https';


class InterFAX {

  constructor(credentials) {
    this.client = new Client(https, credentials, library.version);

    this.delivery  = new Delivery(this.client);
    this.outbound  = new Outbound(this.client, this.delivery);

    this.account   = new Account(this.client);
    this.inbound   = new Inbound(this.client);
    this.documents = new Documents(this.client);
    this.files     = new Files(this.client);

  }
}

export default InterFAX;
