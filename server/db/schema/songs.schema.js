const Schema = require('mongoose').Schema;

const songsSchema = new Schema({
    title: {type: String, required: true},
    album: { type: String, required: true },
    duration: { type: Number, required: true },
    singers: [{type: String}],
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    created: {
      type: Date,
      required: true,
      default: Date.now
   },
   updated: {
    type: Date,
    required: true,
    default: Date.now
 }
});

module.exports = songsSchema;
