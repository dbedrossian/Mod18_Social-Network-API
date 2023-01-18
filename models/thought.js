const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      length: 1-280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    //   getter method to format the timestamp
    },
    username: {
        type: String,
        required: true,
      },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = thoughtSchema;