const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },

    // here it defines object id of liked object
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel',
    },
    // defines the type of liked object (dynamic ref)
    onModel: {
      type: String,
      required: true,
      enum: ['Post', 'Comment'],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
