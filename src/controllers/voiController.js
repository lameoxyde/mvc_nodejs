module.exports = {
  getVoiController: (req, res, next) => {
    res.render("voi.twig", {});
  },
  dragAndDropImg: (req, res, next) => {
    res.render("modules/dragAndDropImg.twig", {});
  }
}