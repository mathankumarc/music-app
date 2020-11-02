const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

global.appRoot = path.resolve(__dirname);

const config = require('./config/' + env + '.config');

const logger = require('./server/util/logger');

require('./server/db/connection');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Include User Routes.
require('./server/routes/user.route')(app);
//Include Songs Routes
require('./server/routes/songs.route')(app);

// Serve the static asset files.
app.use(express.static(__dirname + '/dist/'));

app.get('*', (req, res, next) =>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const server = http.createServer(app);

server.listen(config.port, () => {
    logger.logInfo(`Visual BI music app started on Port:${config.port} in ${env} environment`);
})
