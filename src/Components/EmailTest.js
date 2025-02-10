import axios from "axios";

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://app.snapvalid.com/api/v1/verify?apikey=TYdDSzWPrar12XUX4bZRRwLJFIcutSE44JIpwpCXduCIYqwbtHcO62LQ0e3P&email=jongian90@gmail.com',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

