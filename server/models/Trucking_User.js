const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// const Load = require('./Load');

const truckingUserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
    //   lastName: {
    //     type: String,
    //     required: true,
    //     trim: true
    //   },
      password: {
        type: String,
        required: true,
        minlength: 5
      },
      loads: [
          {
        type: Schema.Types.ObjectId,
        ref: 'Load',
        required: false
    }
   ],
       phoneNumber : {
        type: String,
        required: false
    }
    });
    truckingUserSchema.plugin(uniqueValidator)
    const Trucking_User = mongoose.model('Trucking_User', truckingUserSchema);

    module.exports = Trucking_User;