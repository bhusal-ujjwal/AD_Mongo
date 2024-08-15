const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    firstname:{
        type:Number,
        required:true
    },
    lastname:{
        type:String,
        required: true
    
    },
    age:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model('student',StudentSchema);