const usersRoles = (sequelize, S) => {

    // defino el modelo para roles de usuario
  
    const userRol = sequelize.define(
      "usersrole",
      {
     
        
      },
      {
        timestamps: true,
        createdAt: false,
        updatedAt: 'updateRol'
      }
  );

  return userRol;
};  
  module.exports = usersRoles;
