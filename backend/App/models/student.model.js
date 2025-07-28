const mongoose = require('mongoose');
require('dotenv').config();

const Mongodb_uri = process.env.DBURL;
mongoose.connect(Mongodb_uri);

const studentsSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    }
})

const Students = mongoose.model("Students",studentsSchema);
//const model-name = mongoose.model("collection-Name",Schema-name);

module.exports = {Students}