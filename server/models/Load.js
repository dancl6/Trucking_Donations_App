const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// const Trucking_User = require("./Trucking_User")
// const Dock_User = require("./Dock_User")

const loadSchema = new Schema({
    streetAddress: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    donationItem: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    trucker: {
        type: Schema.Types.ObjectId,
        ref: 'Trucking_User',
        required: true
    },
    currentStatus: {
        type: String,
        required: true
    },
    dock: {
        type: Schema.Types.ObjectId,
        ref: 'Dock_User',
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
    
})

const Load = mongoose.model('Load', loadSchema);

module.exports = Load;