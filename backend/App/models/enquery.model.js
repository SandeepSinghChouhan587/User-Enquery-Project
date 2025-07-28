const mongoose = require('mongoose');
const { Schema } = mongoose;

const enquerySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true,
    }
});

const enqueryModel = mongoose.model("Enqueries", enquerySchema);

module.exports = enqueryModel