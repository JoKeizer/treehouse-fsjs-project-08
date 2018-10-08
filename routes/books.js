const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

/* GET books listing. */
router.get('/', (req, res, next) =>{
  Book.findAll().then( books =>{
    res.render('index',  { title: 'All Books', books });
  });
});

/* GET new books form listing. */
router.get('/new', (req, res, next) => res.render('new-book',  { title: 'New Book', book: Book.build() }) );

/* POST CREATE new books by id. */
router.post('/new', (req, res, next) => {
  Book.create(req.body)
    .then( () => res.redirect(`/books`))
    .catch(err =>{
      if(err.name === "SequelizeValidationError"){
        res.render('new-book',  {
          title: 'New Book',
          book: Book.build(req.body),
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch(error => res.sendStatus(500, error));
});

/* GET READ books by id. */
router.get('/:id', (req, res, next) =>{
  Book.findById(req.params.id).then( book =>{ 
    book ? res.render('update-book',  { title: 'Update Book', book }) : res.sendStatus(404);
  })
  .catch(error => res.sendStatus(500, error));
});

/* POST UPDATE books by id. */
router.post('/:id', (req, res, next) =>{
  Book.findById(req.params.id)
  .then(book =>{
    return book.update(req.body);
  })
  .then(() =>{
    res.redirect('/books');
  })
  .catch(error => res.sendStatus(500, error));
});

/* POST DELETE books by id. */
router.post('/:id/delete', (req, res, next) =>{
  Book.findById(req.params.id)
  .then(book =>{
    return book.destroy();
  })
  .then(() =>{
    res.redirect('/books');
  });
});

module.exports = router;
