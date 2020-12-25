const Like = require('../models/like');
const Post = require('../models/post');
const comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
  try {
    // likes/toggle/?id=dfdf&type=Post or Comment
    let likeable;
    let deleted = false;

    if (req.query.type == 'Post') {
      likeable = await (await Post.findById(req.query.id)).populate('likes');
    } else {
      likeable = await Comment.findById(req.query.id).populate('likes');
    }

    // check if a like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    //if a like already exists then delete it
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      // create new like
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      liekable.save();
    }

    return res.json(200, {
      message: 'Request success',
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
