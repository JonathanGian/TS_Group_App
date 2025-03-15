// @ts-nocheck
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('http://app.snapvalid.com/api/downloadCsv/?api_key=TYdDSzWPrar12XUX4bZRRwLJFIcutSE44JIpwpCXduCIYqwbtHcO62LQ0e3P&file_uploads_id=84&typeDownload=.txt', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));