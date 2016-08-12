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

  constructor(credentials, debug) {
    this._client     = new Client(https, credentials, library.version, debug);
    this._delivery   = new Delivery(this._client, this.documents);

    this.documents = new Documents(this._client);
    this.outbound  = new Outbound(this._client, this._delivery);
    this.deliver   = this._delivery.deliver.bind(this._delivery);

    this.account   = new Account(this._client);
    this.inbound   = new Inbound(this._client);
    this.files     = new Files(this._client, this.documents);

  }
}

export default InterFAX;
