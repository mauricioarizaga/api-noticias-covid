const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
    logging: console.log, // set to console.log to see the raw SQL queries
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
db.Sequelize = Sequelize;
db.sequelize = sequelize;



////////////////////////////////////////////////////////////////////
//Modelos

db.users = require("./Users.js")(sequelize, Sequelize);
db.roles = require("./Roles.js")(sequelize, Sequelize);
db.userRol = require("./UserRol.js")(sequelize, Sequelize);
db.news = require("./News.js")(sequelize, Sequelize);

///////////////////////////////////////////////////////////////////
//Relaciones

//Un usuario tiene un rol
db.users.hasOne(db.userRol, {
  
  onDelete: "CASCADE",
  foreignKey: 'userId'});

  db.userRol.belongsTo(db.users);

//Un rol tiene muchos usuarios
db.roles.hasMany(db.userRol, {

  onDelete: "CASCADE",
  foreignKey: 'roleId',
 })

 db.userRol.belongsTo(db.roles);


module.exports = db;