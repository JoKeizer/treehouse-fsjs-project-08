const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll().then( books =>{
    res.render('index',  { title: 'All Books', books });
  });
});

/* GET new books form listing. */
router.get('/new', function(req, res, next) {
  res.render('new-book',  { title: 'New Book', book: Book.build() });
});

/* POST new books form listing. */
router.post('/new', function(req, res, next) {
  Book.create(req.body).then( book =>{
    res.redirect(`/books/`);
  });
});

/* GET books by id listing. */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id).then( book =>{
    console.log(book);
    res.render('update-book',  { title: 'Update Book', book });
  });
});

/* POST books by id listing. */
router.post('/:id', function(req, res, next) {
  Book.findById(req.params.id)
  .then(book =>{
    return book.update(req.body);
  })
  .then(() =>{
    res.redirect('/books/');
  });
});

/* POST books by id listing. */
router.post('/:id/delete', function(req, res, next) {
  Book.findById(req.params.id)
  .then(book =>{
    return book.destroy();
  })
  .then(() =>{
    res.redirect('/books/');
  });
});

module.exports = router;
