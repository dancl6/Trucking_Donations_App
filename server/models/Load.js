const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
        type: String
    },
    dock: {
        type: Schema.Types.ObjectId,
        ref: 'Dock_User',
        required: true
    },
    rating: {
        type: Number,
        required: false
    }
    
})

const Load = mongoose.model('Load', loadSchema);

module.exports = Load;