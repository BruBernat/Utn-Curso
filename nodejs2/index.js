var moment = require('moment');
moment.locale('es');

console.log ('Hace 10 dias, ' + moment().subtract(10, 'days').calendar() + ' fuí al cine.');