function theUserIsAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(400).json({
    success: false,
    message: "You must be admin",
  });
}

module.exports = theUserIsAdmin;
