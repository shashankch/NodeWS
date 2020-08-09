const Post = require('../models/post');
const User = require('../models/user');
// module.exports.home = function (req, res) {
// return res.end("<h1>express is running for codeial</h1>");
// console.log(req.cookies);
// res.cookie("user_id", 7898);

// Post.find({}, function (err, posts) {
//   return res.render("home", {
//     title: "Codeial|Home",
//     posts: posts,
//   });
// });
// populate the user of each post.
//   Post.find({})
//     .populate('user')
//     .populate({
//       path: 'comments',
//       populate: {
//         path: 'user',
//       },
//     })
//     .exec(function (err, posts) {
//       User.find({}, function (err, users) {
//         return res.render('home', {
//           title: 'Codeial|Home',
//           posts: posts,
//           all_users: users,
//         });
//       });
//     });
// };

// --------- I first method
// using then --not a promise
// Post.find({}).populate('comments').then(function ());

// --------- II second method
// promise like functionality .exec()
// let posts = Post.find({}).populate('comments').exec();
// to execute the above query
// posts.then()

// -------- III method async await

module.exports.home = async function (req, res) {
  // populate the user of each post.
  try {
    let posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });
    let users = await User.find({});
    req.flash('success', 'Posts refresh success!');
    return res.render('home', {
      title: 'Codeial|Home',
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    req.flash('error', err);
    // console.log('Error', err);
    return;
  }
};
