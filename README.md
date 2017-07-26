# moneymoney_server

### #System requirements
  - [NodeJS](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com)
  
### #Development
Install package `nodemon`.
```sh
$ npm install -g nodemon
```
Config `HOST`, `PORT`, `DB_URI` in `.env` file and run this command.
```sh
$ nodemon server.js
```

### #API
Index | API | Description | Method | Params | Types
------|-----|-------------|--------|--------|-------
**1** | `/register` | To register, you must enter email, password and name. | **POST** | `email`, `password`, `name` | String, String, String
**2** | `/sign_in` | To sign in, you must enter email and password. | **POST** | `email`, `password` | String, String
**3** | `/sign_out` | To sign out, you don't need to post any data. | **POST** | |
**4** | `/info` | To get info, you must **sign in** and enter email. | **GET** | `email` | String
**5** | `/info` | To edit info, you must **sign in** and enter email and name. | **PUT** | `email`, `name` | String, String
**6** | `/v1/card/create` | To create card,  you must **sign in** and enter type, balance, name, expiration, card number, cvv and email. | **POST** | `type`, `balance`, `name`, `exp`, `number`, `cvv`, `email` | String, Number, String, Number, Number, Number, String
**7** | `/v1/cards` | To get all info of user's card, you must **sign in** and enter id. | **GET** | `id` | String
**8** | `/v1/record/create` | To create new record, you must **sign in** and enter datetime (timestamp), category, card's id and value. | **POST** | `datetime`, `category`, `card`, `value`, `note`, `picture` | Number, String, String, Number, String, String
**9** | `/v1/records` | To get total of each category, you must **sign in** and enter card's id. | **GET** | `id` | String
**10** | `/v1/records/<type>/<category>` | To get record by category, you must **sign in** and enter card's id, type and category. **Notice**:Now, we just supported **Balance** and **Income**. | **GET** | `id`, `type`, `category` | String, String
**11** | `/v1/record/delete` | To delete a record, you must **sign in** and enter record's id. | **DELETE** | `id` | String
**12** | `/v1/record/edit` | To edit record, you must **sign in** and enter id, datetime (timestamp), category, card's id and value. | **PUT** | `id`, `datetime`, `category`, `card`, `value`, `note`, `picture` | Number, String, String, Number, String, String
**13** | `/v1/note/create` | To create new note, you must **sign in** and enter email. | **POST** | `email`, `title`, `content` | String, String, String
**14** | `/v1/notes` | To get all notes of user, you must **sign in** and enter email. | **GET** | `email` | String
**15** | `/v1/note/delete` | To delete note, you must **sign in** and enter id. | **DELETE** | `id` | String
**16** | `/v1/note/edit` | To edit note, you must **sign in** and enter id. | **PUT** | `id`, `title`, `content` | String, String, String
