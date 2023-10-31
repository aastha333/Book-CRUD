const db = require('../config/database').getUserDB();

const { Schema } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  summary: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
}
);

const Book = db.model('book', bookSchema);

module.exports = Book;
