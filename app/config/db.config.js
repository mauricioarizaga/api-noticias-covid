module.exports = {
    HOST: "localhost",
    USER: "mauricio",
    PASSWORD: "mauricio",
    DB: "c19noticias",
    dialect: "postgres",
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };