const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

const config = require(global.appRoot + '/config/' + env + '.config');

module.exports = (app) => {

    // Middleware to authenticate the requests.
    app.use(['/api/playlist/*', '/songs/*'], (req, res, next) => {

        jwt.verify(req.headers['authorization'], config.jwt.secret, (error, decoded) => {

            if (error) {

                res.status(401).send('Unauthorised Access!');
            }
            else {
                req.userInfo = {...decoded.data}
                next()
            }

        })

    });

}