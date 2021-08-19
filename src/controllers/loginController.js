const loginModel = require("../models/loginModel");

module.exports = {
  getLoginController : (req, res, next) => {
    const login = loginModel.getLogin();
    res.render("login.twig", { login });
  },
  registerLoginController : (req, res, next) => {
      const reg = loginModel.register();
      const id = req.params.id;
    res.render("register.twig", { reg ,id });
  }
}