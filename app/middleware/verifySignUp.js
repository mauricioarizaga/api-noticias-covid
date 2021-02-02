const db = require("../models");
const Users = db.users;

checkDuplicateEmail = async (req, res, next) => {
    const {email} =req.body
    // Verificamos Email no exista
  await  Users.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error. Este mail ya está en uso"
        });
        return;
      }
      next();
    });
  
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;