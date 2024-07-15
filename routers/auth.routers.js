const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");

router.post("/signup", authController.signup);


module.exports = router;
