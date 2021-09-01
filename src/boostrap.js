////activate all route
module.exports = (app, router) => {
  require("./routes/login.js").appRoute(router);
  require("./routes/voi.js").appRoute(router);
  require("./routes/api.js").appRoute(router);
};
