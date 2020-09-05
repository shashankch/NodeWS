const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });

    return res.json(200, {
      message: 'list of posts',
      posts: posts,
    });
  } catch (error) {}
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
    post.remove();

    await Comment.deleteMany({ post: req.params.id });

    return res.status(200).json({
      message: 'Post and its comments delete success',
    });
    } else {
       return res.status(401).json({
         message: 'you cannot delete this post!',
       });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
    // console.log('Error', err);
  }
};
