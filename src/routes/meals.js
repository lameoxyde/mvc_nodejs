exports.appRoute = router => {
  router.get("/menu", require("../controllers/mealsController").getMenuController);
  
};
