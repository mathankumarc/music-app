/**
 * Provides the local/dev machine configuration.
 */

const commonConfig = require('./common.config');

module.exports = {
    ...commonConfig,
    mongo: {
        port: 27017,
        host: 'localhost'
    },
    jwt: {
        secret: '7UgRW588mFzz20WeD+4pj9qBzKtB6BBX'
    }
}
