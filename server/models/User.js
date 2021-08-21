const mongoose = require('mongoose'); 
const { isEmail } = require('validator');

const User = mongoose.Schema({
    name : { 
        type: String, 
        required: true, 
    },
    email : { 
        type:String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        validate: isEmail,
    },
    password : { 
        type:String, 
        required: true,   
        minLength: 8, 
    },
    typeAccount: {type: String, default: 'customer' },
    address: Array,
    orders: Array,
}, { timestamps: true });


module.exports = mongoose.model("User", User);
