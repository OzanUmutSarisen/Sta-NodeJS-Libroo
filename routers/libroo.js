const express = require('express')
const User = require('../models/user')
const Author = require('../models/author')
const Book = require('../models/book')
const FavBooksList = require('../models/favBooksList')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("libroo Page")
})

router.get('/user/:id', async(req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.json(user)
})

router.get('/usermail/:mail', async(req, res) => {
    const { mail } = req.params
    const user = await User.findOne({"email":mail})
    res.send(user)
})

router.post('/adduser', async(req, res) => {

    const post = req.body
    const createdData = await User.create(post)
    res.json(createdData)
})

router.get('/authors', async(req, res) => {
    const authors = await Author.find()
    res.json(authors)
})

router.get('/author/:id', async(req, res) => {
    const { id } = req.params
    const author = await Author.findById(id)
    res.json(author)
})


router.post('/addauthor/:id', async(req, res) => {
    const { id } = req.params
    const { role } = await User.findById(id)

    if(role === "user"){
        const { phoneNumber } = req.body

        const post = {userID:id, phoneNumber}
        const createdData = await Author.create(post)
    
        const post2 = {role:"author"}
        await User.findByIdAndUpdate(id, post2, {new:true});
        res.json(createdData)
    }else{
        res.send("You already author")
    }
})

router.get('/books', async(req, res) => {
    const books = await Book.find()
    res.json(books)
})

router.get('/book/:id', async(req, res) => {
    const { id } = req.params
    const books = await Book.findById(id)
    res.json(books)
})


router.post('/addbook/:id', async(req, res) => {
    const { id } = req.params
    const { name, released, summary, bookImageUrl } = req.body
    const post = {authorID:id, name, released, summary, bookImageUrl}
    const createdData = await Book.create(post)
    res.json(createdData)
})

router.get('/favbook/:id', async(req, res) => {
    const { id } = req.params
    const favBooks = await FavBooksList.find()
    var result = []
    favBooks.forEach(favBook => {
        if (favBook.userID === id){
            result.push(favBook)
        }
    });
    res.json(result)
    
})

router.post('/addfavbook/:idUser/:idBook', async(req, res) => {
    const { idUser, idBook} = req.params
    const favBooks = await FavBooksList.find()
    let favlisthave = false
    favBooks.every(favBook => {
        if (favBook.userID === idUser){
            if(favBook.bookID === idBook){
                favlisthave = true
                res.send("You already add this book to favlist")
                return false
            }
        }
        return true
    });
    if(favlisthave === false){
        const post = {bookID:idBook, userID:idUser}
        const createdData = await FavBooksList.create(post)
        res.json(createdData)
    }
})


module.exports = router