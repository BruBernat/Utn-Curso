var express = require('express');
var router = express.Router();
var partesModel= require('./../models/partesModel')

/* GET home page. */
router.get('/',  async function(req, res, next) {

  var partes = await partesModel.getPartes()

  res.render('index', {
    partes
  });
});


module.exports = router;
