const mongoose = require('mongoose');
const songsSchema = require('./../schema/songs.schema');

const Songs = mongoose.model('Songs', songsSchema);

module.exports = Songs;
