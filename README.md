# todo - tasks list app

## Requirements:
Node.js >=v8.x, MongoDB v4.2.0 up and running, npm v6.9.0

## How to install:

`npm i`

`npm run build`

`npm start`

After that app will be available at `http://localhost:3000`

## User guide:
App has authentification, so to log in, user must be preliminary created. 

Create user command example:

`node ./src/server/util/createUser.js user_login user_password`

After login with provided credentials, user can see main app page, which UX is pretty self-explanatory.

## Dev notes
According to requirements app must depend only of express, mongodb and angular, so authentification implementation on server looks a bit uncommon.
