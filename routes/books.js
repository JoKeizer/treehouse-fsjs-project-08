var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res, next) {
  res.render('index',  { title: 'All Books' });
});

/* GET new books form listing. */
router.get('/new', function(req, res, next) {
  res.render('new-book',  { title: 'New Book' });
});

/* POST new books form listing. */
router.post('/new', function(req, res, next) {
  res.render('new-book',  { title: 'New Book' });
});

/* GET books by id listing. */
router.get('/:id', function(req, res, next) {
  res.render('update-book',  { title: 'Update Book' });
});

/* POST books by id listing. */
router.post('/:id', function(req, res, next) {
  res.render('update-book',  { title: 'Update Book' });
});

/* POST books by id listing. */
router.post('/:id/delete', function(req, res, next) {
  res.render('update-book',  { title: 'Delete Book' });
});

module.exports = router;
