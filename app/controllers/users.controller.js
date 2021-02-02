const config = require("../config/auth.config");
const db = require("../models");
const UserRole = db.userRol;

exports.allAccess = (req, res) => {
    res.status(200).send("Acceso para invitados.");
  };
  
exports.userBoard = (req, res) => {
    res.status(200).send("Acceso solo para usuarios.");
  };
  authUserAdmin

exports.authUserAdmin = (req, res) => {
  const {userIdToken} =req;
  const {idUser} =req.body
if(userIdToken){
  UserRole.update(
    { roleId: 3 },
    {
    where: {
      userId: idUser
    }
  }).catch(err =>{
    console.log(err)
  })
  res.status(200).send("Acceso solo para usuarios.");
} else{
  res.status(200).send("Acceso solo para usuarios.");
 
}

   };