const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Load = require("./Load")

const dockUserSchema = new Schema({
    streetAddress: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
})