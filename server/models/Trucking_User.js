const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Load = require('./Load');

const truckingUserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5
      },
      loads: [Load.schema]
    });

    const Trucking_User = mongoose.model('Trucking_User', truckingUserSchema);

    module.exports = Trucking_User;