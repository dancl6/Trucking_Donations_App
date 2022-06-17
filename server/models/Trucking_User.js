const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const LoadValue = require('./Load')
// const Load = require('./Load');

const truckingUserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      rating: {
        type: Number,
        required: false
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
  

    // set up pre-save middleware to create password
    truckingUserSchema.pre('save', async function(next) {
      if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
      }

      next();
    });

    // compare the incoming password with the hashed password
    truckingUserSchema.methods.isCorrectPassword = async function(password) {
      return await bcrypt.compare(password, this.password);
    };

    truckingUserSchema.plugin(uniqueValidator)  

    const Trucking_User = mongoose.model('Trucking_User', truckingUserSchema);

    module.exports = Trucking_User;