const Restaurant = require("../models/restaurant.model");

//Create and Save a New Restaurant
exports.create = async (req, res) => {
  const { name, type, imgUrl } = req.body;
  if (!name || !type || !imgUrl) {
    res.status(400).send({
      message: "Name, Type or imgUrl can not be empty!",
    });
    return;
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant already exists!",
      });
      return;
    }
    //Create a New Restaurant
    const newRestaurant = {
      name: name,
      type: type,
      imgUrl: imgUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Somthing error occured creating the restaurant.",
        });
      });
  });
};

//get all restaurant
exports.getAll = async (req,res)=>{
    await Restaurant.findAll().then((data) =>{
        res.send(data)
    }).catch((error) =>{
        res.status(500).send({
          message:
            error.message || "Somthing error occured creating the restaurant.",
        });
    });
}
//Get By ID
exports.getByID = async(req,res)=>{
    const id = req.params.id;
    await Restaurant.findByPk(id).then((data)=>{
        if (!data){
            res.status(404).send({message:"No found Restaurant with id"
                + id});
        }else{
            res.send(data);
        }
    })
    .catch((error) =>{
        res.status(500).send({
            message:
            error.message ||
            "Something error occured while creating the restaurant"
        });
    });
};
//update a restaurant
exports.update = async (req,res) =>{
    const id = req.params.id;
    await Restaurant.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Restaurant was update succesfully" });
        } else {
          res.send({
            message:
              "cannot update restaurant with id=" +
              id +
              ".Maybe restaurant was not found or req.body is empty",
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the restaurant",
        });
      });
    
};
//delete a restaurant
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Restaurant.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurant was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Restaurant with id" + id +".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the restaurant.",
      });
    });
};