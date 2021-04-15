const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// const Load = require('./Load');

const truckingUserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
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

    const Trucking_User = mongoose.model('Trucking_User', truckingUserSchema);

    module.exports = Trucking_User;