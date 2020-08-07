const Post = require("../models/post");

// module.exports.post = function (req, res) {
//   res.end("<h1>your post is saved  successfully</h1>");
// };

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};
