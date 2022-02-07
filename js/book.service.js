'use strict';
const STORAGE_KEY = 'bookDB';
var gBooks;
const gBookNames = ['harry-potter', 'save-the-animals', 'the-architect'];
var bookDesc = [{ 'harry-potter': 'jkhhuihuhuhjhjjhjhj' }, {}];
var gFilterBy;
var gFilterByOrder = 0;

_createBooks();

function getBooks() {
  if (gFilterBy === 'price') {
    gBooks.sort(function (a, b) {
      if (a.price < b.price) return !gFilterByOrder ? -1 : 1;
      return !gFilterByOrder ? 1 : -1;
    });
    gFilterByOrder = !gFilterByOrder ? 1 : 0;
  } else if (gFilterBy === 'id') {
    gBooks.sort(function (a, b) {
      if (a.id.charAt(0).toLowerCase() + a.id.slice(1) < b.id.charAt(0).toLowerCase() + b.id.slice(1))
        return !gFilterByOrder ? -1 : 1;
      return !gFilterByOrder ? 1 : -1;
    });
    gFilterByOrder = !gFilterByOrder ? 1 : 0;
  } else if (gFilterBy === 'title') {
    gBooks.sort(function (a, b) {
      if (a.title < b.title) return !gFilterByOrder ? -1 : 1;
      return !gFilterByOrder ? 1 : -1;
    });
    gFilterByOrder = !gFilterByOrder ? 1 : 0;
  }
  return gBooks;
}

function _createBook(name, price) {
  return {
    id: makeId(),
    title: name,
    price: price,
    rate: 0,
  };
}
function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    books = [];
    gBookNames.forEach((name) => {
      var price = getRandomInt(10, 100);
      books.push(_createBook(name, price));
    });
  }
  gBooks = books;
  _saveBooksToStorage();
}

function deleteBook(bookId) {
  var bookIdx = gBooks.findIndex((book) => +bookId === book.id);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}
function addBook(name, price) {
  var newBook = _createBook(name, price);
  gBooks.push(newBook);
  _saveBooksToStorage();
}
function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateBook(bookId, bookPrice) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id);
  gBooks[bookIdx].price = bookPrice;
  _saveBooksToStorage();
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id);
  return book;
}

function getBookIdxById(bookId) {
  const book = gBooks.findIndex((book) => bookId === book.id);

  return book;
}

function saveToSto() {
  _saveBooksToStorage();
}
