const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      length: trimmed,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validation: email,
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;