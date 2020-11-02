/**
 * Logger helper methods.
 * 
 * @TODO Log the required information to the error tracking application such as Rollbar, Sentry
 * 
 * @param {*} msg 
 * @param {*} details 
 */

const logInfo = (msg) => {
    console.log(msg);
}

const logDebug = (msg, details) => {
    console.log(msg, details);
}

const logError = (msg, details) => {
    console.log(msg, details);
}
module.exports = {
    logInfo: logInfo,
    logDebug: logDebug,
    logError: logError,
}
