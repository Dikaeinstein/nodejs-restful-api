# nodejs-restful-api
A Nodejs rest api built with express, redis, postgres and jwt for authentication.

### Installation

To install on local machine run this commands:
```
git clone https://github.com/Dikaeinstein/nodejs-todo-rest-api.git

yarn add
```

### Run Locally

First replace all occurence of dikaeinstein in 'nodejs-todo-rest-api.sql' file with your db username.
Then run :

```

./scripts/db-restore.sh
```

to create database and tables.

create .env like the .env.sample file, just replacewith your own enviroment variables.

Now start the server:

```
npm start
npm start-dev     /* to watch for file changes */
```

You query the endpoints but you must be authenticated.
Create user first: POST /localhost:port/api/users

Then use jwt to authenticate and query the endpoints
