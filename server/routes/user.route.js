const UserModel = require('./../db/model/user.model');
const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

const config = require(global.appRoot + '/config/' + env + '.config');

module.exports = (app) => {
    app.post('/user/register',  (req, res, next) => {
        console.log(req.body);
        //res.status(400).send('Not found');
        /**
         * @TODO Sanitize the values.
         */
        UserModel.create(req.body).then((result) => {
            console.log(result);
            res.send({msg: "Successfully Registerd."});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    });

    app.post('/user/login', (req, res, next) => {

        if (!req.body.email || !req.body.password) {
            res.status(400).send('Bad Request');
        }

        UserModel.findOne({ email: req.body.email }, (err, data) => {
            if (err || !data) {

                res.status(400).send('Bad Request'); 

            }
            else {

                const isMatch = data.validatePassword(req.body.password);

                if (!isMatch) {
                    res.status(401).send('Unauthorised access!');
                }
                else {

                    const token = jwt.sign({
                        data: {email: data.email, firstName: data.firstName, lastName: data.lastName}
                        }, config.jwt.secret, { expiresIn: '10h' });
                    res.status(200).send({token: token});

                }

            }

        });

    });

}
