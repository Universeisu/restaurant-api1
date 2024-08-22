const { DataTypes } = require("sequelize");
const sequelize = require("./db");
//define DB Schema
const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.sync({ force: false })
  .then(() => {
    console.log("User table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating User table:", error);
  });

module.exports = User;
