const sequelize = require("./db");
const Sequelize = require("sequelize");
const User = require ("./user.models");
const Role = require ("./role.models");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;

//Association
db.User.belongsToMany(db.Role,{
    through:"user_roles"
});
db.Role.belongsToMany(db.User,{
    through:"user_roles"
});


module.exports = db;