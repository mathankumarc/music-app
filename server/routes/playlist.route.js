const PlaylistModel = require('./../db/model/playlist.model');

module.exports = (app) => {

    app.post('/api/playlist/create',  (req, res, next) => {


        /**
         * @TODO Sanitize the values.
         */
        PlaylistModel.create({...req.body, user_id: req.userInfo.user_id}).then((result) => {

            res.send({result});

        })
        .catch((error) => {

            res.status(400).send(error);

        });
    });

    app.post('/api/playlist/update',  (req, res, next) => {

        /**
         * @TODO Sanitize the values.
         */
        PlaylistModel.findOneAndUpdate({_id: req.body._id}, {songs: req.body.songs, updated: new Date()}, {new: true}).then((result) => {

            res.send(result);
        })
        .catch((error) => {
    
            res.status(400).send(error);
        });
    });

    app.get('/api/playlist/getAll', (req, res, next) => {

        PlaylistModel.find({}, "title created" , (err, data) => {
            if (err || !data) {

                res.status(400).send('Bad Request'); 

            }
            else {

                res.status(200).send(data)

            }

        });

    });

    app.get('/api/playlist/get/:id', (req, res, next) => {

        PlaylistModel.findOne({_id: req.params.id}, "title songs created" , (err, data) => {
            if (err || !data) {

                res.status(400).send('Bad Request'); 

            }
            else {

                res.status(200).send(data)

            }

        });

    });

}
