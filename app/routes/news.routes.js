const { authJwt } = require("../middleware");
const controller = require("../controllers/news.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


 ////////        API             ////////////////////////////////////  

// Listado NOTICIAS por Fecha  
app.get(
  "/news/bydate",
 [authJwt.verifyToken, authJwt.validateUserRol], 
  controller.newsListbyDate
); 
app.get(
  "/news/search",
  [authJwt.verifyToken, authJwt.validateUserRol], 
  controller.newsSearch
);

};