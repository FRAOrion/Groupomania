const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  timezone: '+02:00',
  // operatorsAliases: false,
  logging: false // Couper les logs SQL dans la console
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.articles = require("./article.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.likes = require("./like.model")(sequelize, Sequelize);
db.dislikes = require("./dislike.model")(sequelize, Sequelize);

module.exports = db;