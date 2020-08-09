const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = function (req, res) {
//   Post.findById(req.body.post, function (err, post) {
//     if (post) {
//       Comment.create(
//         {
//           content: req.body.content,
//           post: req.body.post,
//           user: req.user._id,
//         },
//         function (err, comment) {
//           if (err) {
//             console.log('error in fetching comments!');
//             return res.redirect('back');
//           }

//           post.comments.push(comment);
//           post.save();

//           return res.redirect('/');
//         },
//       );
//     }
//   });
// };

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();
      req.flash('success', 'You commented!');
      return res.redirect('/');
    }
  } catch (err) {
    req.flash('error', err);
    // console.log('Error', err);
    return;
  }
};

// module.exports.destroy = function (req, res) {
//   Comment.findById(req.params.id, function (err, comment) {
//     if (comment.user == req.user.id || req.params.uid == req.user.id) {
//       let postId = comment.post;
//       comment.remove();

//       Post.findByIdAndUpdate(
//         postId,
//         { $pull: { comments: req.params.id } },
//         function (err, post) {
//           return res.redirect('back');
//         },
//       );
//     } else {
//       return res.redirect('back');
//     }
//   });
// };

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id || req.params.uid == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash('success', 'You removed this comment!');
      return res.redirect('back');
    } else {
      req.flash('error', 'You cannot delete this comment!');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    // console.log('Error', err);
    return;
  }
};
