//link route with API module
exports.appRoute = router => {
    router.post("/api/import/xlsx/:collection", require("../modules/api/api").importXlsx);
    router.get("/api/records/:collection", require("../modules/api/api").getRecord);
  };
  