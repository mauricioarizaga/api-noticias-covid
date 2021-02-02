const Roles = (sequelize, S) => {

    // defino el modelo para el tipo de roles para un usuario
  
    const Rol = sequelize.define(
      "roles",
      {
        name: {
          type: S.STRING,
          allowNull: false,
        },
        description: {
          type: S.STRING,
          allowNull: false,
        },
    },
    {
      timestamps: false,
    }
  );

  return Rol;
};
  
  module.exports = Roles;
  