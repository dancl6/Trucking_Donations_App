const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// const Load = require("./Load")

const dockUserSchema = new Schema({
    name: {
        type: String,
        required: true
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

const Dock_User = mongoose.model('Dock_User', dockUserSchema);

module.exports = Dock_User;