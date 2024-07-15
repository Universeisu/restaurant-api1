const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Register a new user
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({
      message: "Please provide all required fields",
    });
    return;
  }

  // Prepare user data
  const newUser = {
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10), // Use appropriate salt rounds
  };

  try {
    // Save user in the database
    const user = await User.create(newUser);

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });
      await user.setRoles(roles);
      res.send({
        message: "User registered successfully!",
      });
    } else {
      // Set default role to "user" id=1
      await user.setRoles([1]);
      res.send({
        message: "User registered successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "An error occurred while registering a new user",
    });
  }
};
