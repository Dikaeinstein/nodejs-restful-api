# nodejs-restful-api
A Nodejs rest api built with express, redis, postgres and jwt for authentication.

### Installations

_Make sure you have postgres and redis installed on local machine._

To install app and setup db on local machine run this commands:
```
git clone https://github.com/Dikaeinstein/nodejs-todo-rest-api.git

yarn add
```

### Run Locally

Create .env like the .env.sample file, just replace with your own enviroment variables.

Now start the server:

```
npm start
npm start-dev     /* to watch for file changes */
```

To query the endpoints but you must be authenticated.

Create user first: POST host:port/api/users

Then use jwt token in the 'x-access-token' header to authenticate and query the endpoints
