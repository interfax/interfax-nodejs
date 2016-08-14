
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

All our API calls support Promises to handle asynchronous callbacks. For example to send a fax from a PDF file:

```js
import InterFAX from 'interfax';
let interfax = new InterFAX();

interfax.deliver({
  faxNumber : '+11111111112',
  file : 'folder/fax.pdf'
}).then(fax => {
  return interfax.outbound.find(fax.id);
  //=> find the fax we just created
}).then(fax => {
  console.log(fax.status);
  //=> the status of the fax we just sent
})
.catch(error => {
  console.log(error);
  //=> an error object
});
```

Alternatively we also support callbacks instead of promises.

```js
interfax.deliver({
  faxNumber : '+11111111112',
  file : 'folder/fax.pdf'
}, function(error, response) {
  if (error) {
    console.log(error);
    //=> an error object
  } else {
    console.log(response.id);
    //=> the ID of the Fax just created
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
});

// Alternative: Initialize using
// environment variables
// * INTERFAX_USERNAME
// * INTERFAX_PASSWORD
let interfax = new InterFAX();
```

All connections are established over HTTPS.

## Account

### Balance

`interfax.account.balance(callback);`

Determine the remaining faxing credits in your account.

```js
interfax.account.balance()
  .then(console.log); //=> 9.86
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/3001)

## Outbound

[Send](#send-fax) | [Get list](#get-outbound-fax-list) | [Get completed list](#get-completed-fax-list) | [Get record](#get-outbound-fax-record) | [Get image](#get-outbound-fax-image) | [Cancel fax](#cancel-a-fax) | [Search](#search-fax-list)

### Send fax

`.outbound.deliver(options, callback);`

Submit a fax to a single destination number.

There are a few ways to send a fax. One way is to directly provide a file path or url.

```js
// with a path
interfax.outbound.deliver({
  faxNumber: '+11111111112',
  file: 'folder/fax.txt'
}).then(fax => {
  console.log(fax) //=> fax object
});

// or with a URL
interfax.outbound.deliver({
  faxNumber: '+11111111112',
  file: 'https://s3.aws.com/example/fax.pdf'
}).then(...);
```

InterFAX supports over 20 file types including HTML, PDF, TXT, Word, and many more. For a full list see the [Supported File Types](https://www.interfax.net/en/help/supported_file_types) documentation.

The returned object is a plain object with just an `id`. You can use this ID to load more information, get the image, or cancel the sending of the fax.

```js
interfax.outbound.deliver({
  faxNumber: '+11111111112',
  file: 'folder/fax.txt'
}).then(fax => {
  return interfax.outbound.cancel(fax.id);
}).then(success => {
  //=> now the fax is cancelled
});;
```

Additionally you can create a [`File`](#faxfile) with binary data and pass this in as well.

```js
let data = fs.readFileSync('fax.pdf');
let file = interfax.files.create(data, mime_type: 'application/pdf');

interfax.outbound.deliver({
  faxNumber: "+11111111112",
  file: file
}).then(...);
```

To send multiple files just pass in an array of strings and [`File`](#faxfile) objects.

```js
interfax.outbound.deliver({
  faxNumber: "+11111111112",
  files: ['file://fax.pdf', 'https://s3.aws.com/example/fax.pdf']
}).then(...);
```

Under the hood every path and string is turned into a  [`File`](#faxfile) object. For more information see [the documentation](#faxfile) for this class.

**Options:** [`contact`, `postponeTime`, `retriesToPerform`, `csid`, `pageHeader`, `reference`, `pageSize`, `fitToPage`, `pageOrientation`, `resolution`, `rendering`](https://www.interfax.net/en/dev/rest/reference/2918)

**Alias**: `interfax.deliver`

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

### Get outbound fax image

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

## Inbound

[Get list](#get-inbound-fax-list) | [Get record](#get-inbound-fax-record) | [Get image](#get-inbound-fax-image) | [Get emails](#get-forwarding-emails) | [Mark as read](#mark-as-readunread) | [Resend to email](#resend-inbound-fax)

### Get inbound fax list

`interfax.inbound.all(options, callback);`

Retrieves a user's list of inbound faxes. (Sort order is always in descending ID).

```js
interfax.inbound.all({
  limit: 5
}).then(faxes => {
  console.log(faxes); //=> an array of fax objects
});
```

**Options:** [`unreadOnly`, `limit`, `lastId`, `allUsers`](https://www.interfax.net/en/dev/rest/reference/2935)

---

### Get inbound fax record

`interfax.inbound.find(fax_id, callback);`

Retrieves a single fax's metadata (receive time, sender number, etc.).

```js
interfax.inbound.find(123456)
  .then(fax => {
    console.log(fax); //=> fax object
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2938)

---

### Get inbound fax image

`interfax.inbound.image(fax_id, callback);`

Retrieves a single fax's image.

```js
interfax.inbound.image(123456)
  .then(image => {
    console.log(image.data); //=> TIFF image data
    image.save('file.tiff'); //=> saves image to file
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2937)

---

### Get forwarding emails

`interfax.inbound.emails(fax_id, callback);`

Retrieve the list of email addresses to which a fax was forwarded.

```js
interfax.inbound.emails(123456)
  .then(emails => {
    console.log(emails); //=> a list of email objects
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2930)

---

### Mark as read/unread

`interfax.inbound.mark(fax_id, is_read, callback);`

Mark a transaction as read/unread.

```js
// mark as read
interfax.inbound.mark(123456, true)
  .then((success) => {
    console.log(success); // boolean
  });

// mark as unread
interfax.inbound.mark(123456, false)
  .then((success) => {
    console.log(success); // boolean
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2936)

### Resend inbound fax

`interfax.inbound.resend(fax_id, to_email, callback);`

Resend an inbound fax to a specific email address.

```js
// resend to the email(s) to which the fax was previously forwarded
interfax.inbound.resend(123456)
  .then((success) => {
    console.log(success); // boolean
  });

// resend to a specific address
interfax.inbound.resend(123456, 'test@example.com')
  .then((success) => {
    console.log(success); // boolean
  });
=> true
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2929)

---

## Documents

[Create](#create-document) | [Upload chunk](#upload-chunk) | [Get list](#get-document-list) | [Status](#get-document-status) | [Cancel](#cancel-document)

Document allow for uploading of large files up to 20MB in 200kb chunks. For example to upload a 500

```js
import fs from 'fs';

let upload = function(cursor = 0, document, data) {
  if (cursor >= data.length) { return };
  let chunk = data.slice(cursor, cursor+500);
  let next_cursor = cursor+Buffer.byteLength(chunk);

  interfax.documents.upload(document.id, cursor, next_cursor-1, chunk)
    .then(() => { upload(next_cursor, document, data); });
}

fs.readFile('tests/test.pdf', function(err, data){
  interfax.documents.create('test.pdf', Buffer.byteLength(data))
    .then(document => { upload(0, document, data); });
});
```

### Create Documents

`interfax.documents.create(name, size, options, callback);`

Create a document upload session, allowing you to upload large files in chunks.

```js
interfax.documents.create('large_file.pdf', 231234)
  .then(document => {
    console.log(document.id); // the ID of the document created
  });
```

**Options:** [`disposition`, `sharing`](https://www.interfax.net/en/dev/rest/reference/2967)

---

### Upload chunk

`interfax.documents.upload(id, range_start, range_end, chunk, callback);`

Upload a chunk to an existing document upload session.

```js
interfax.documents.upload(123456, 0, 999, "....binary-data....")
  .then(document => {
    console.log(document);
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2966)

---

### Get document list

`interfax.documents.all(options, callback);`

Get a list of previous document uploads which are currently available.

```js
interfax.documents.all({
  offset: 10
}).then(documents => {
  console.log(documents); //=> a list of documents
});
```

**Options:** [`limit`, `offset`](https://www.interfax.net/en/dev/rest/reference/2968)

---

### Get document status

`interfax.documents.find(document_id, callback);`

Get the current status of a specific document upload.

```js
interfax.documents.find(123456)
  .then(document => {
    console.log(document); //=> a document object
  });
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2965)

---

### Cancel document

`interfax.documents.cancel(document_id, callback);`

Cancel a document upload and tear down the upload session, or delete a previous upload.

```js
interfax.documents.cancel(123456)
  .then(success => {
    console.log(success); //=> boolean
  })
```

**More:** [documentation](https://www.interfax.net/en/dev/rest/reference/2964)

---

## Contributing

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

## License

This library is released under the [MIT License](LICENSE).
E).
