module.exports = function(req, res, next) {
  // eslint-disable-next-line no-console
  console.log("hi there");
  if (req.user) {
    return next();
  }
  res.redirect("/");
};
