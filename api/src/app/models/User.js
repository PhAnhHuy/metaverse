
const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { 
            type: String, 
            require: [true, 'Please enter your username!'],
            unique: true,
        },
        password: {
            type: String, 
            require: [true, 'Please enter your password!'],
            minLength: [8, 'Password should have more than 8 characters']
        },
        email: {
            type: String,
            require: [true, 'Please enter your email'],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);