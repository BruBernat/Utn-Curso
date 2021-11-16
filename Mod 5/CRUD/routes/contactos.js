var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contactos');
});



router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

console.log(req.body);

    var obj = {
     to: 'brunellabernat23@gmail.com',
     subjet: 'CONTACTO WEB',
     html: nombre + " " + apellido + " se contacto a través de la web y quiere mas información a este correo: " + mensaje + ". <br> Su tel es: " + telefono
   }

   var transport = nodemailer.createTransport({
     host: process.env.SMPT_HOST,
     port: process.env.SMPT_PORT,
     auth:{
       user: process.env.SMPT_USER,
       pass: process.env.SMPT_PASS,
     }
   });

   var info = await transport.sendMail(obj);

   res.render('contactos', {
     message: 'mensaje enviado correctamente'
   });
 })
module.exports = router;