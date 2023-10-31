const response = require('../response/index');
const httpStatus = require('http-status');
const Book = require('../model/book');
const common = require('../services/common');
const { getPagination } = require('../utils/helper');

const addBook = async (req, res) => {
  try {
    const { ...data } = req.body;
    const saveBook = await common.create(Book, data);
    if (!saveBook) {
      return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.FORBIDDEN);
    }
    return response.success(req, res, { msgCode: 'BOOK_ADDED', data: saveBook }, httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getBookList = async (req, res) => {
  try {
    const { page, size } = req.query;
    const limitOffset = getPagination(page, size);
    const skip = Number(limitOffset.offset);
    const limit = Number(limitOffset.limit);
    const search = req.query.search || '';

    let condition = {};
    if (search) {
      condition = {
        $or: [
          { title: new RegExp(search, 'i') },
          { author: new RegExp(search, 'i') },
          { summary: new RegExp(search, 'i') }]
      };
    }
    const bookList = await Book.find(condition).skip(skip).limit(limit);
    // const bookList = await common.findAll(Book);

    if (!bookList) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.NOT_FOUND);
    }
    return response.success(req, res, { msgCode: 'LIST_FETCHED', data: bookList }, httpStatus.OK);
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.query;
    const findBOOK = await common.getByCondition(Book, { _id: id });
    if (!findBOOK) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.NOT_FOUND);
    }
    return response.success(req, res, { msgCode: 'BOOK_FOUND', data: findBOOK }, httpStatus.ACCEPTED);
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

const updateBookById = async (req, res) => {
  try {
    const { id } = req.query;
    const { ...data } = req.body;
    const findBook = await common.getByCondition(Book, { _id: id });
    if (!findBook) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.NOT_FOUND);
    }
    const updateBook = await common.updateByCondition(Book, { _id: id }, data);
    return response.success(req, res, { msgCode: 'BOOK_UPDATED', data: updateBook }, httpStatus.ACCEPTED);
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

const delBookById = async (req, res) => {
  try {
    const { id } = req.query;
    const findBook = await common.getByCondition(Book, { _id: id });
    if (!findBook) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.NOT_FOUND);
    }
    const deleteBook = await common.deleteByField(Book, { _id: id });
    if (!deleteBook) {
      return response.error(req, res, { msgCode: 'FAILED_TO_DELETE' }, httpStatus.FORBIDDEN);
    }
    return response.success(req, res, { msgCode: 'BOOK_DELETED' }, httpStatus.ACCEPTED);
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

module.exports = {
  addBook,
  getBookList,
  getBookById,
  updateBookById,
  delBookById
};
