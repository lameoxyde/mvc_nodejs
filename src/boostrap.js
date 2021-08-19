////activate all route
module.exports = (app, router) => {
  require("./routes/meals.js").appRoute(router);
  require("./routes/login.js").appRoute(router);
};
