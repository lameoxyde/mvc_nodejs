exports.appRoute = router => {
    router.get("/voi", require("../controllers/voiController").getVoiController);
  };
  