# InterFAX Node Library

## NOTE: This is still a work in progress

[![Module Version](https://badge.fury.io/js/interfax.svg)](https://badge.fury.io/js/interfax) [![Build Status](https://travis-ci.org/interfax/interfax-nodejs.svg?branch=master)](https://travis-ci.org/interfax/interfax-nodejs)

[Installation](#installation) | [Getting Started](#getting-started) | [Contributing](#contributing) | [License](#license)

Send and receive faxes in Node / Javascript with the [InterFAX](https://www.interfax.net/en/dev) REST API.

## Installation

This library requires Node 4+ and can be installed via NPM.

```sh
npm install interfax --save
```

The module is written in ES6 and is compiled to ES5 for backwards compatibility. All documentation below is ES6.

## Getting started

To send a fax from a PDF file:

```js
import InterFAX from 'interfax';

let interfax = new InterFAX({
  username: '...',
  password: '...'
});

interfax.deliver({
  faxNumber : '+11111111112',
  file : 'folder/fax.pdf'
}).then(faxId => {
  console.log(faxId) //=> the Fax ID just created
})
.catch(error => {
  console.log(error); //=> an error object
});
```

Alternatively we also support callbacks instead of promises.

```js
interfax.deliver({
  faxNumber : '+11111111112',
  file : 'folder/fax.pdf'
}, function(error, response) {
  if (error) {
    console.log(error); //=> an error object
  } else {
    console.log(response) //=> the Fax ID just created
  }
});
```

# Usage

[Client](#client) | [Account](#account) | [Outbound](#outbound) | [Inbound](#inbound) | [Documents](#documents) | [Helper Classes](#helper-classes)

## Client

The client follows the [12-factor](http://12factor.net/config) apps principle and can be either set directly or via environment variables.

```js
import InterFAX from 'interfax';

// Initialize using parameters
let interfax = new InterFAX({
  username: '...',
  password: '...'
})

// Alternative: Initialize using
// environment variables
// * INTERFAX_USERNAME
// * INTERFAX_PASSWORD
let interfax = new InterFAX()
```

All connections are established over HTTPS.

## Account

### Balance

`interfax.account.balance(callback);`

Determine the remaining faxing credits in your account.

```js
interfax.account.balance()
  .then(balance => {
    console.log(balance); //=> 9.86
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/3001)

## Outbound

[Send](#send-fax) | [Get list](#get-outbound-fax-list) | [Get completed list](#get-completed-fax-list) | [Get record](#get-outbound-fax-record) | [Get image](#get-outbound-fax-image) | [Cancel fax](#cancel-a-fax) | [Search](#search-fax-list)

### Send fax

TBD

---

### Get outbound fax list

`interfax.outbound.all(options, callback);`

Get a list of recent outbound faxes (which does not include batch faxes).

```js
interfax.outbound.all({
  limit: 5
}).then(faxes => {
  console.log(faxes); //=> an array of fax objects
});
```

**Options:** [`limit`, `lastId`, `sortOrder`, `userId`](https://www.interfax.net/en/dev/rest/reference/2920)

---

### Get completed fax list

`interfax.outbound.completed(array_of_ids, callback);`

Get details for a subset of completed faxes from a submitted list. (Submitted id's which have not completed are ignored).

```js
interfax.outbound.completed([123, 234])
  .then(faxes => {
    console.log(faxes); //=> an array of fax objects
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2972)

----

### Get outbound fax record

`interfax.outbound.find(fax_id, callback);`

Retrieves information regarding a previously-submitted fax, including its current status.

```js
interfax.outbound.find(123456)
  .then(fax => {
    console.log(fax); //=> fax object
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2921)

---

### Get oubound fax image

`interfax.outbound.image(fax_id, callback);`

Retrieve the fax image (TIFF file) of a submitted fax.

```js
interfax.outbound.image(123456)
  .then(image => {
    console.log(image.data); //=> TIFF image data
    image.save('file.tiff'); //=> saves image to file
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2941)

----

### Cancel a fax

`interfax.outbound.cancel(fax_id, callback);`

Cancel a fax in progress.

```js
interfax.outbound.cancel(123456)
  .then(fax => {
    console.log(fax); //=> fax object
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2939)

----

### Search fax list

`interfax.outbound.search(options, callback);`

Search for outbound faxes.

```js
interfax.outbound.search({
  faxNumber: '+1230002305555'
}).then(faxes => {
  console.log(faxes); //=> an array of fax objects
});
```

**Options:** [`ids`, `reference`, `dateFrom`, `dateTo`, `status`, `userId`, `faxNumber`, `limit`, `offset`](https://www.interfax.net/en/dev/rest/reference/2959)

## Contributing

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

## License

This library is released under the [MIT License](LICENSE).
