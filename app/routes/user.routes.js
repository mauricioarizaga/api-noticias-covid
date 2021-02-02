const { authJwt } = require("../middleware");
const controller = require("../controllers/users.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Todos los usuarios
app.get("/test/all", controller.allAccess);

// Test User logueado
app.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.put(
    "/admin/user",
    [authJwt.validateUserAdmin],
    controller.authUserAdmin
  );

};