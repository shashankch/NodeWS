module.exports.home = function (req, res) {
  // return res.end("<h1>express is running for codeial</h1>");
  console.log(req.cookies);
  res.cookie("user_id", 7898);
  return res.render("home", {
    title: "home",
  });
};
