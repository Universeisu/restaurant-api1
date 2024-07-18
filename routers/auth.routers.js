const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const { verifySignup } = require("../middlewares");

router.use((req, res, next) => {
  res.header(
    "Access-control-Allow-Headers",
    "x-access-token,Origin,Content-Type,Accept"
  );
  
});

router.post(
  "/signup",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  authController.signup
);
router.post("/signin", authController.signin);

module.exports = router;

