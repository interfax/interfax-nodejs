# InterFAX Node Library

## NOTE: This is still a work in progress

[![Gem Version](https://badge.fury.io/js/interfax.svg)](https://badge.fury.io/js/interfax) [![Build Status](https://travis-ci.org/interfax/interfax-nodejs.svg?branch=master)](https://travis-ci.org/interfax/interfax-nodejs)

[Installation](#installation) | [Getting Started](#getting-started) | [Contributing](#contributing) | [License](#license)

Send and receive faxes in Node / Javascript with the [InterFAX](https://www.interfax.net/en/dev) REST API.

## Installation

This gem requires Node 4+ and can be installed via NPM.

```sh
npm install interfax --save
```

## Getting started

To send a fax from a PDF file:

```js
var InterFAX = require('interfax');

var interfax = new InterFAX({
  username: '...',
  password: '...'
})

// with a promise
interfax.deliver({
  'faxNumber' : "+11111111112",
  'file' : 'folder/fax.pdf'
}).then(faxId => {
  console.log(faxId) //=> the Fax ID just created
})
.catch(error => {
  console.log(error); //=> an error object
});

// with a callback
interfax.deliver({
  'faxNumber' : "+11111111112",
  'file' : 'folder/fax.pdf'
}, function(error, response) {
  if (error) {
    console.log(error.response.statusCode);
  } else {
    console.log(response.statusCode);
    console.log(response.body);
  }
});
```

# Usage

[Client](#client) | [Account](#account) | [Outbound](#outbound) | [Inbound](#inbound) | [Documents](#documents) | [Helper Classes](#helper-classes)

## Client

The client follows the [12-factor](http://12factor.net/config) apps principle and can be either set directly or via environment variables.

```js
var InterFAX = require('interfax');

// Initialize using parameters
var interfax = new InterFAX({
  username: '...',
  password: '...'
})

// Alternatice: Initialize using environment variables
// * INTERFAX_USERNAME
// * INTERFAX_PASSWORD
interfax = new InterFAX()
```

All connections are established over HTTPS.

## Account

### Balance

`interfax.account.balance(callback);`

Determine the remaining faxing credits in your account.

```js
interfax.account.balance()
  .then(function(balance) {
    console.log(balance) //=> 9.86
  })
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
}).then(function(faxes) {
  console.log(faxes) //=> an array of fax objects
});
```

**Options:** [`limit`, `lastId`, `sortOrder`, `userId`](https://www.interfax.net/en/dev/rest/reference/2920)

---

### Get completed fax list

`interfax.outbound.completed(array_of_ids, callback)`

Get details for a subset of completed faxes from a submitted list. (Submitted id's which have not completed are ignored).

```js
interfax.outbound.completed([123, 234])
  .then(function(faxes) {
    console.log(faxes) //=> an array of fax objects
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2972)

---

## Contributing

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

## License

This library is released under the [MIT License](LICENSE).
