const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://app.snapvalid.com/api/check-queue-progress/?api_key=TYdDSzWPrar12XUX4bZRRwLJFIcutSE44JIpwpCXduCIYqwbtHcO62LQ0e3P', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));