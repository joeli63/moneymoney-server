# moneymoney_server

### #System requirements
  - [NodeJS](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com)
  
### #Development
Install package `nodemon`.
```sh
npm install -g nodemon
```
Config `HOST`, `PORT`, `DB_URI` in `.env` file and run this command.
```sh
nodemon server.js
```

### #API
API | Description | Method | Params | Types
----|-------------|--------|-------|-------
`/register` | To register, you must enter email and password. | POST | `email`, `password` | String, String
`/sign_in` | To sign in, you must enter email and password. | POST | `email`, `password` | String, String
`/sign_out` | To sign out, you don't need to post any data. | POST | |
`/v1/create_card` | To create card,  you must enter type, balance, name, expiration, card number, cvv and email. | POST | `type`, `balance`, `name`, `exp`, `number`, `cvv`, `email` | String, String, String, String, String, String, String
