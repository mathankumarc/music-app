const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');
const saltFactor = 15;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

userSchema.pre('save', function save(next) {

    if (!this.isModified('password'))
    {
        return next();
    }

    try {
      const salt = bcrypt.genSaltSync(saltFactor);
      this.password = bcrypt.hashSync(this.password, salt);

      return next();
    }
    catch (err) {
      return next(err);
    }
});

userSchema.methods.validatePassword = function validatePassword(data) {

  /**
   * @TODO This will block the main thread, do this in a async way.
   */
    return bcrypt.compareSync(data, this.password);

};

module.exports = userSchema;
