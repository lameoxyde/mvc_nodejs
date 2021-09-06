const loginModel = require("../models/loginModel");

module.exports = {
  getLoginController : (req, res, next) => {
    const login = loginModel.getLogin();
    let  params = ['_id','Year','Industry_aggregation_NZSIOC','Industry_code_NZSIOC','Units','Variable_code','Variable_category','Value','Industry_code_ANZSIC06']
    let urlGet = `http://10.202.46.21:3000/api/records/long`
    let urlAdd= 'http://10.202.46.21:3000/api/import/xlsx/long'
    res.render("login.twig", { urlAdd,urlGet,params});
  },
  registerLoginController : (req, res, next) => {
      const reg = loginModel.register();
      const id = req.params.id;
    res.render("register.twig", { reg ,id });
  }
}