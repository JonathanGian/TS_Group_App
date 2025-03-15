This is just quick instructions for us:

1. Install

```shell
npm install
```

2. Run mariadb createStatement

```shell
npm run mariadb
```

3. Run server

```shell
npm run dev
```

If you want to test the connection you can goto:

```html
http://localhost:5005/test-db
```
If you want to test the registration (added a new user to the table in MariaDB), goto postman and select a POST request to this endpoint: 

```html
http://localhost:5005/api/auth/register
```

and include something like this in the JSON body:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

You can then go check the table in mariadb and see its in there.