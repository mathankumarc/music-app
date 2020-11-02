const SongsModel = require('./../db/model/songs.model');
const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

const config = require(global.appRoot + '/config/' + env + '.config');

module.exports = (app) => {

    // Middleware to authenticate the requests.
    app.use('/songs/*', (req, res, next) => {
        console.log(req.body);
        console.log(req.headers);
        jwt.verify(req.headers['authorization'], config.jwt.secret, (error, decoded) => {
            console.log(decoded, error);
            if (error) {
                console.log('in unauthorised access');
                res.status(401).send('Unauthorised Access!');
            }
            else {
                next()
            }
        })
        //res.status(200).send();
    });

    app.post('/songs/create',  (req, res, next) => {
        console.log(req.body);
        //res.status(400).send('Not found');
        /**
         * @TODO Sanitize the values.
         */
        SongsModel.create(req.body).then((result) => {
            console.log(result);
            res.send({msg: "Successfully Created."});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    });

    app.get('/songs/getAll', (req, res, next) => {

        SongsModel.find({}, (err, data) => {
            if (err || !data) {

                res.status(400).send('Bad Request'); 

            }
            else {

                res.status(200).send(data)

            }

        });

    });

}
