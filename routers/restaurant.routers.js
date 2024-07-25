const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controllers");
const { authJwt } = require("../middlewares");

//create a restaurant
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantController.create
);
//get all restaurant
router.get("/", restaurantController.getAll);
//get a restaurant by id
router.get("/:id", [authJwt.verifyToken], restaurantController.getByID);
//update a restaurant
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin],
  restaurantController.update
);
//delete a restaurant
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  restaurantController.delete
);

module.exports = router;
