const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aoutherSchema = new Schema({
    phoneNumber:{                     
        type: String,
        require: true
    },
    userID:{
        type: String,
        require: true 
    }
}, {timestamps: true})



const Author = mongoose.model('Author', aoutherSchema)
module.exports = Author