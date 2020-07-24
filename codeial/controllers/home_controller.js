module.exports.home = function (req, res) {
  // return res.end("<h1>express is running for codeial</h1>");
  return res.render("home", {
    title: "home",
  });
};
