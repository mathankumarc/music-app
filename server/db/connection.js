const mongoose = require('mongoose');
const logger = require('./../util/logger');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

const config = require(global.appRoot + '/config/' + env + '.config');

const makeConnection = async () => {
    try {
        await mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/test`, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch (error) {
        logger.logError(error);
    } 
}

makeConnection();

mongoose.connection.on('error', err => {
    logger.logError(err);
});

mongoose.connection.once('open', err => {
    logger.logInfo(`MongoDB Connection established`);
});
