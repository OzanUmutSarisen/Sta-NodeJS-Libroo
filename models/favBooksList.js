const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favBooksListSchema = new Schema({
    bookID:{                     
        type: String,
        require: true
    },
    userID:{
        type: String,
        require: true 
    }
}, {timestamps: true})



const FavBooksList = mongoose.model('FavBooksList', favBooksListSchema)
module.exports = FavBooksList