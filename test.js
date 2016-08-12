let fs = require('fs');
let https = require('https');

let data1 = fs.readFileSync('tests/test.pdf');
let data2 = fs.readFileSync('tests/test.html');

let length1 = Buffer.byteLength("--43e578690a6d14bf1d776cd55e7d7e29");
let length2 = Buffer.byteLength("--43e578690a6d14bf1d776cd55e7d7e29--");
let length3 = Buffer.byteLength(data1);
let length4 = Buffer.byteLength(data2);
let length5 = Buffer.byteLength("Content-Type: application/pdf");
let length6 = Buffer.byteLength("Content-Type: text/html");
let length7 = Buffer.byteLength('\r\n');

// let length = (2*length1)+length2+length3+length4+length5+length6+(10*length7);
let length = length1+length5+length3+length2+(5*length7);
console.log(length);

let request = https.request({
  'host': 'rest.interfax.net',
  'path': '/outbound/faxes?faxNumber=00442084978659',
  'port': 443,
  'auth': 'cbetta:MmuRBTZq7u2iCd',
  'method': 'POST',
  'headers': {
    'Content-Type': 'multipart/mixed; boundary=43e578690a6d14bf1d776cd55e7d7e29',
    'Content-Length': length
  }
}, function(response) {
  console.log(`Status code: ${response.statusCode}`);
  console.log(response.headers);

  let body = '';
  response.on('data', function(d) {
    body += d;
  });

  response.on('end', function() {
    console.log(body);
  });
});

request.write("--43e578690a6d14bf1d776cd55e7d7e29");
request.write('\r\n');
request.write('Content-Type: application/pdf');
request.write('\r\n');
request.write('\r\n');
request.write(data1);
request.write('\r\n');
request.write('\r\n');
// request.write("--43e578690a6d14bf1d776cd55e7d7e29");
// request.write('\r\n');
// request.write('Content-Type: text/html');
// request.write('\r\n');
// request.write('\r\n');
// request.write(data2);
// request.write('\r\n');
// request.write('\r\n');
request.write("--43e578690a6d14bf1d776cd55e7d7e29--");

request.end();
