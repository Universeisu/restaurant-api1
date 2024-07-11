const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controllers");
  

//create a restaurant 
router.post("/",restaurantController.create);
//get all restaurant
router.get("/",restaurantController.getAll);
//get a restaurant by id
router.get("/:id",restaurantController.getByID);
//update a restaurant
router.put("/:id",restaurantController.update);
//delete a restaurant
router.delete("/:id",restaurantController.delete);

module.exports = router;