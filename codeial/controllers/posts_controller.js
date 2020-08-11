const Post = require('../models/post');
const Comment = require('../models/comment');
// module.exports.post = function (req, res) {
//   res.end("<h1>your post is saved  successfully</h1>");
// };

// module.exports.create = function (req, res) {
//   Post.create(
//     {
//       content: req.body.content,
//       user: req.user._id,
//     },
//     function (err, post) {
//       if (err) {
//         console.log('error in creating a post');
//         return;
//       }

//       return res.redirect('back');
//     },
//   );
// };

// module.exports.create = async function (req, res) {
//   try {
//     let post = await Post.create({
//       content: req.body.content,
//       user: req.user._id,
//     });

//     req.flash('success', 'Post published !');
//     return res.redirect('back');
//   } catch (err) {
//     req.flash('error', err);
//     return;
//     // console.log('Error', err);
//   }
// };

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      // for populating the name of the user for ajax requests.
      // (otherwise this will be undefined when appending to the dom).
      // and only sending the name not password.
      post = await post.populate('user', 'name').execPopulate();
      return res.status(200).json({
        data: {
          post: post,
        },
        message: 'Post created!',
      });
    }

    req.flash('success', 'Post published !');
    return res.redirect('back');
  } catch (err) {
    req.flash('error', err);
    return;
    // console.log('Error', err);
  }
};

// module.exports.destroy = function (req, res) {
//   Post.findById(req.params.id, function (err, post) {
//     // .id means converting the object Id into string.
//     if (post.user == req.user.id) {
//       post.remove();

//       Comment.deleteMany({ post: req.params.id }, function (err) {
//         return res.redirect('back');
//       });
//     } else {
//       return res.redirect('back');
//     }
//   });
// };

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: 'Post deleted!',
        });
      }

      req.flash('success', 'Post and its comments removed!');
      return res.redirect('back');
    } else {
      req.flash('error', 'You cannot delete this post!');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    return;
    // console.log('Error', err);
  }
};
