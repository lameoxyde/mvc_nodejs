module.exports = {
  getVoiController: (req, res, next) => {
    let urlAdd= 'http://10.202.46.21:8000/api/import/xlsx/voi'

    let  params = ['MMSI','POSITION','TYPE','OBSERVATIONS']
    let urlGet= 'http://10.202.46.21:8000/api/records/voi'

    res.render("voi.twig", {urlAdd,urlGet,params});
  }
}