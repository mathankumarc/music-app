const SongsModel = require('./../db/model/songs.model');

module.exports = (app) => {

    app.post('/songs/create',  (req, res, next) => {

        /**
         * @TODO Sanitize the values.
         */
        SongsModel.create(req.body).then((result) => {

            res.send({msg: "Successfully Created."});
        })
        .catch((error) => {

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
