const mongoose = require('mongoose');
const playlistSchema = require('./../schema/playlist.schema');

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
