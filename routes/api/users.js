const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const User = require('./../../models/User');
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');


// @route /api/users
// @desc  create user

router.post('/', [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please incluse a valid email").isEmail(),
    check("password", "please enter a password with 6 or more characters").isLength({min : 6})
],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {name , email , password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
           return  res.status(400).json({errors : [{msg : "User Alreday Exists"}]});
        }

        let avatar = gravatar.url(email, {
            s : '200',
            r : "pg",
            d : "mm"
        });

        user = new User({
            name ,
            email, 
            password,
            avatar
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        const payload = {
            user : {
                id : user.id
            }
        }
        jwt.sign(payload, config.get("secret"), {expiresIn : "30d"}, (err, token)=>{
            if(err){
               throw err;
            }
            res.send({token});
        });
        // res.json({Authorization })
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send("server Error");
    }
})

module.exports = router;