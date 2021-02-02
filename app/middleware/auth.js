const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const UserRol = db.userRol

verifyToken = (req, res, next) => {
  let token = req.headers["token"];

  if (!token) {
    return res.status(403).send({
      message: "No token!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No has traido la credencial correspondiente!"
      });
    }
    req.userIdToken = decoded.id;
    next();
  });
};

//Revisa que el rol del usuario sea correcto 

// Admin = 1, Inactive = 2, User = 3
validateUserRol = async (req, res, next) => {
const {userIdToken} = req 
const validUser = await UserRol.findOne({
  where:{
    userId: userIdToken
        }
})
//Validar que sea un usuario con permisos o no venga sin ningun id de usuario el req 
if(!validUser || validUser.dataValues.roleId==2) 
{res.status(401).send({message: "Este usuario no tiene los permisos necesarios."})
}
next();
}

//Valida que sea un admin del sistema 
validateUserAdmin = async (req, res, next) => {
  const {userIdToken} = req 
  const validUser = await UserRol.findOne({
    where:{
      userId: userIdToken
          }
  })
  //Validar que sea un usuario con permiso Admin o que no venga sin ningun id de usuario el req 
  if(!validUser || validUser.dataValues.roleId!==1) 
  {res.status(401).send({message: "Este usuario no tiene los permisos necesarios."})
  }
  next();
  }

const authJwt = {
  verifyToken: verifyToken,
  validateUserRol:validateUserRol,
  validateUserAdmin:validateUserAdmin
};
module.exports = authJwt;