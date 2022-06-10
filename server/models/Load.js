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
    number: {
        type: Number,
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
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    dateStart: {
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        hour: {
            type: Number,
            required: true
        },
        minute: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    timeStart: {



        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    timeEnd: {
        type: Date,
        required: true
    }
    
})

const Load = mongoose.model('Load', loadSchema);

module.exports = Load;