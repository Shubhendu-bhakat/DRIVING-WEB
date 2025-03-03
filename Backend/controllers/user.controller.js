const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');

//function for register user 
module.exports.registerUser = async(req,res,next)=>{
    //for request validation comming from the req object
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    
    const { fullname, email, password } = req.body;

    //if the user already exists then return 400 status with specified error
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }
    //else complete the registration process 

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token =  user.generateAuthToken();

    res.status(200).json({token,user});
}

//user login route


module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    //comparePasword alredy exists in userMode
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, user });
}

//get profile 
module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}
