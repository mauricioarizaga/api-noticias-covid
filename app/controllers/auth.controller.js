const config = require("../config/auth.config");
const db = require("../models");
const Users = db.users;
const Roles = db.roles;
const UserRole = db.userRol;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  
  // Guardar User en la db
  const { firstName,lastName,email,password} = req.body;
  const regExpPass = /^(?=\w*\d)(?=\w*[0-9])(?=\w*[a-z])\S{8,}$/; //Setea el regExp para las contraseñas

  if(password.match(regExpPass)){
    const hashedPassword = await bcrypt.hash(password, 10);
    Users.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  }).then(async (user) => {
    const roles = await Roles.findByPk(2)
    UserRole.create({
      userId: user.id,
      roleId: roles.dataValues.id
    })
    return res.json(user);
  }).catch((err) => {
      if (err.original) res.send(err.original.detail);
      else res.send("Error de validación de datos");
    });
  }else{
    res.send("Error de validación de datos. El password tiene que contener números, letras y un mínimo de 8 caracteres");
  }
};

//Login User
exports.signin =  async (req, res) => {
  const { email , password} = req.body;
 
//busca el usuario
await Users.findOne({
    where: {
      email: email
    }
  })
    .then(async user => {

if(!user) return res.status(404).send({ message: "Este usuario no existe." });
if(user){
  const roles = await UserRole.findOne({
    where: {
    userId: user.id
    }})
if(!roles) return res.status(404).send({ message: "Este usuario no tiene un tipo de rol definido." });
  
const passwordIsValid = bcrypt.compareSync(password,user.dataValues.password);
      
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Password incorrecto!!!"
        });
      }
      const token = jwt.sign({ id: user.dataValues.id }, config.secret, {
        expiresIn: 3600 // 1 hora
      });

      res.status(200).send({
        id: user.dataValues.id,
        username: user.dataValues.email,
        user_type: roles.dataValues.roleId,
        accessToken: token
      });
    }    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};