const router = require('express').Router();
const controller = require('../../../controller/book');
const { reqValidator } = require('../../../middleware');
const schema = require('../../../validation/book');

router.post('/add-book', reqValidator(schema.addBook), controller.addBook);

router.get('/get-book-list', controller.getBookList);

router.get('/get-book-by-id', reqValidator(schema.requireId, 'query'), controller.getBookById);

router.post('/update-book-by-id', reqValidator(schema.requireId, 'query'), reqValidator(schema.editBook), controller.updateBookById);

router.post('/delete-book-by-id', reqValidator(schema.requireId, 'query'), controller.delBookById);

module.exports = router;
