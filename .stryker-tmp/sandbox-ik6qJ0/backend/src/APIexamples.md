# Single Validation API
STATUS:200 Resoponse:

```json
HTTP/1.1 200 OK
{
"email": "help1@unelmasupport.com",
"user": "help1",
"domain": "unelmasupport.com",
"accept_all": 0,
"role": 0,
"free_email": 0,
"disposable": 0,
"spamtrap": 0,
"success": true,
"result": "undeliverable",
"message": "This address cannot receive emails."
}
```
Response Parameters

Response

The response is in the form of a JSON schema and includes the following fields:

```json
email (string): The verified email address.
user (string): The username part of the email address.
domain (string): The domain of the email address.
accept_all (integer): Indicates if the domain accepts all emails.
role (integer): Indicates if the email address is a role-based address.
free_email (integer): Indicates if the email address is from a free email provider.
disposable (integer): Indicates if the email address is disposable.
spamtrap (integer): Indicates if the email address is a spam trap.
success (boolean): Indicates if the verification was successful.
result (string): The result of the verification.
message (string): Additional message related to the verification.
```

Status 200

```json
{
  "email": "somen@gmail.com",
  "user": "somen",
  "domain": "gmail.com",
  "accept_all": 0,
  "role": 0,
  "free_email": 1,
  "disposable": 0,
  "spamtrap": 0,
  "success": false,
  "result": "undeliverable",
  "message": "Undeliverable"
}
```

Status 400

```json
{
  "result": "invalid",
  "message": "Invalid email format.",
  "email": "insert_your_email",
  "success": false
}
```

# Bulk Emails

## Bulk Download

### REQUEST:

```js
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('http://app.snapvalid.com/api/downloadCsv/?api_key=TYdDSzWPrar12XUX4bZRRwLJFIcutSE44JIpwpCXduCIYqwbtHcO62LQ0e3P&file_uploads_id=40&typeDownload=.txt', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

### Response

```json

{
  "status": 200,
  "zip": "https://app.snapvalid.com/zip_archive/contacts.zip",
  "message": "CSV files have been successfully zipped and are ready for download.",
  "download_url": "https://app.snapvalid.com/zip_archive/contacts.zip"
}

or {}

```

## Delete Bulk:

### REQUEST:

```js
const options = {method: 'DELETE', headers: {accept: 'application/json'}};

fetch('https://app.snapvalid.com/api/deleteFileUpload/?api_key=TYdDSzWPrar12XUX4bZRRwLJFIcutSE44JIpwpCXduCIYqwbtHcO62LQ0e3P&file_uploads_id=33', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

### RESPONSE

```json
{
  "status": 200,
  "message": "File upload and associated records deleted successfully."
}

OR

{}

```

## Upload Bulk

```js
import axios from 'axios';

const form = new FormData();
form.append('file', 'data:text/plain;name=emails.txt;base64,c2FkYXNkYXNkYQ==');

const options = {
  method: 'POST',
  url: 'https://app.snapvalid.com/api/upload-bulk-emails',
  params: {api_key: 'TYdDSzWPrar12XUX4bZRRwLJFIcutSE44JIpwpCXduCIYqwbtHcO62LQ0e3P'},
  headers: {
    accept: 'application/json',
    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
  },
  data: '[form]'
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

### RESPONSE

```json
{
  "status": 200,
  "msg": "Uploaded and sent for cleaning...",
  "file_uploads_id": 94
}

OR

STATUS: 422
{
  "message": "The file field is required.",
  "errors": {
    "file": [
      "The file field is required."
    ]
  }
}

STATUS: 403

{
  "error": "Invalid API key"
}
```
