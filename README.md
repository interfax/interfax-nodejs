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
}).then(response => {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
})
.catch(error => {
  console.log(error.response.statusCode);
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

[Client](#client) | [Account](#account)

## Client

The client follows the [12-factor](https://github.com/interfax/interfax-ruby/blob/rest-client/12factor.net/config) apps principle and can be either set directly or via environment variables.

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

#### Balance

`interfax.account.balance(callback)`

Determine the remaining faxing credits in your account.

```js
interfax.account.balance()
  .then(response => {
    console.log(response.body) //=> 9.86
  })
```


## Contributing

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

## License

This library is released under the [MIT License](LICENSE).
