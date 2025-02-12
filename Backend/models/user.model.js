const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlenght: [3, 'Too short for first name at least 3 characters'],
        },
        lastname:{
            type: String,
            required: true,
            minlenght: [3, 'Too short for last name at least 3 characters'],
        },
        email:{
            type: String,
            required: true,
            unique: true,
            minlenght: [6, 'Too short for email at least 6 characters'],
        },
        password:{
            type: String,
            required: true,
            select : false,
        },
        socketId:{
            type: String,
            default: '',
        },
    }
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}