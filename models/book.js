const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name:{                     
        type: String,
        require: true
    },
    released:{
        type: String,
        require: true 
    },
    summary:{
        type: String,
        require: true 
    },
    authorID:{
        type: String,
        require: true 
    },
    bookImageUrl:{
        type: String,
        require: true 
    }
}, {timestamps: true})



const Book = mongoose.model('Book', bookSchema)
module.exports = Book