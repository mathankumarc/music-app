## Music App

**Author**
 - Mathankumar Chermakani <mathankumar.c@gmail.com>

**Prerequisite**
 - Node 14.x
 - Mongo DB 4.4
 - yarn 1.22.10
 - create a config file with name local.config.js(or [NODE_ENV].config.js if an emv set in NODE) under config folder, sample below
 ```
 module.exports = {
    ...commonConfig,
    mongo: {
        connectionString: "mongodb://localhost:27017/musicapp"
    },
    jwt: {
        secret: 'adfdsgh456436hghfdhfgd5w546'
    }
}
```

 **Steps to Run Application**
 - Clone the Repo
 - Make sure Prerequisites are fulfilled
 - > yarn
 - > yarn build
 - > node index.js

 **API Documentation**

|API Name | Route | Method | Body | Sample |
| --- | --- | --- | --- | --- |
| User Registration | user/register | POST | {firstName, lastName, email, password} | {msg: "Successfully Registerd."} |
| User Login | user/login | POST | {email, password} | {token: token} |
| Songs getAll | api/songs/getAll | GET | | [{_id, title, albumn, duration, singers, created, updated}] |
| Songs Create | api/songs/create | POST | {title, album, duration, singers} | {msg: "Successfully Created."} |
| Playlist Create | api/songs/create | POST | {title} | {title, created, user_id} |
| Playlist Update | api/songs/update | POST | {title, _id, songs} | {title, created, user_id, _id, songs} |
| Playlist getAll | api/playlist/getAll | GET |  | [{title, created, user_id, _id, songs}] |
| Playlist get | api/playlist/get/:id | GET | ID | {title, created, user_id, _id, songs} |