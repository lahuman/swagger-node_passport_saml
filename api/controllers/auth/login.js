"use stirct";

const passport = require("passport");
const passportConfig = require("../../../lib/passport").config;

const login = passport.authenticate(passportConfig.strategy, {
  successRedirect: "/",
  failureRedirect: "/api/login",
});

const logout = async (req, res, next) => {
  req.logout();
  res.status(200).end();
};

const loginCheck = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(403).end();
    return;
  }

  res.json(req.user);
};

module.exports = {
  login,
  logout,
  loginCheck,
};
