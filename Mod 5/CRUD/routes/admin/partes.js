var express = require('express');
var router = express.Router();
var partesModel = require('./../../models/partesModel');
/* GET home page. */
router.get('/', async function (req, res, next) {
  var partes = await partesModel.getPartes()

  res.render('admin/partes', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    partes

  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await partesModel.deletePartesById(id);
  res.redirect('/admin/partes')
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
});

router.post('/agregar', async(req, res, next) =>{
  try{
    if (req.body.nombre != "" && req.body.cuerpo !="") {
      await partesModel.insertPartes(req.body);
      res.redirect('/admin/partes')
    }else{
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: "Todos los campos son requeridos"
      })
    }
  }catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout:'admin/layout',
      error: true, message: 'No se cargaron las partes'
    });
  }
});

router.get('/editar/:id', async (req, res, next) => {

  let id = req.params.id;
  let partes = await partesModel.getPartesById(id);
  res.render('admin/editar', {
    layout: 'admin/layout',
    partes
  });
});

router.post('/editar', async (req, res, next) =>{
  try{
    let obj = {
      nombre: req.body.nombre,
      cuerpo: req.body.cuerpo
    }
    await partesModel.editarPartesById(obj, req.body.id);
    res.redirect('/admin/partes');
  }
  catch (error) {
    console.log(error)
    res.render('admin/editar',{
      layout: 'admin/layout',
      error: true, message: 'No se editó correctamente'
    })
  }
})

module.exports = router;
