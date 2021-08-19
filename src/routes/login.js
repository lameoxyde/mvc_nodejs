//link route with controller
exports.appRoute = router => {
  router.get("/login", require("../controllers/loginController").getLoginController);
  router.get("/register/:id?", require("../controllers/loginController").registerLoginController);
};
