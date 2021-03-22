const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const db = require("./app/models");
const port = process.env.PORT || 3001;
var cron = require('node-cron');
const getNews = require("./app/services/news.service.js");


app.name = 'API-Midas';
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ''); // Rellenar con la url donde se enviarán las requests
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//Rutas
require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/news.routes.js')(app);

// set port, listen for requests

db.sequelize.sync({force: false}).then(() => {
  console.log('/////////////////////////////////////////////////////////////////////')
  console.log(`Server :) en ${port}!!!`);
});


app.listen(port, () => {
  console.log('/////////////////////////////////////////////////////////////////////')
  console.log(`Server :) en ${port}!!!`);
  
  //Tasks 

  //Actualiza noticias cada 8 minutos
  cron.schedule('*/8 * * * *', () => {
    console.log('Api task Create News every 8 minutes');
   getNews.getNewsList();
  })


  //Borra los datos de las database con mas de 5 dias
  cron.schedule('0 1 * * *', () => {
    console.log('Api task Delete News dayly job at 01:00 at Buenos_Aires timezone');
    getNews.cleanFiveDaysDB();
  }, {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
  });

});

