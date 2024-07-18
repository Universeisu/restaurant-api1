const User = require("../models/user.models");
const Role = require("../models/role.models");
const { Op } = require("sequelize");

checkDuplicateUsernameOrEmail = async(req,res,next) =>{
    //check username
    await User.findOne({
        where:{
            username:req.body.username
        }
    }).then((user)=>{
        if(user){
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
        //check email
        User.findOne({
            where:{
                email:req.body.email,
            },
        }).then((user)=>{
            if (user) {
              res
                .status(400)
                .send({ message: "Failed! Email is already in use!" });
              return;
            }
            next();
        });
    });
};

//check roles are vaild
checkRolesExisted = async(req,res,next)=>{
    if(req.body.roles){
        Role.findAll({
            where:{
                name:{ [Op.or]:req.body.roles},
            },
        }).then((roles)=>{
            if(roles.length !== req.body.roles.length){
                res.status(400).send({message:"failed! Role does not exist"});
                return;
            }
            next();
        });
    }else{
        next();
    }
};

const verifySignup ={
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignup;