const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// const beautifyUnique = require('mongoose-beautiful-unique-validation')
const LoadValue = require('./Load')
const { Schema } = mongoose;

const bcrypt = require('bcrypt');
// const Load = require("./Load")


const dockUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: 'Two users cannot share the same username ({VALUE})'
    },
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
})

    // set up pre-save middleware to create password
    dockUserSchema.pre('save', async function(next) {
        if (this.isNew || this.isModified('password')) {
          const saltRounds = 10;
          this.password = await bcrypt.hash(this.password, saltRounds);
        }
  
        next();
      });
  
      // compare the incoming password with the hashed password
      dockUserSchema.methods.isCorrectPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
      };

dockUserSchema.plugin(uniqueValidator)
const Dock_User = mongoose.model('Dock_User', dockUserSchema);

module.exports = Dock_User;