'use strict';

function onInit() {
  renderBooks();
}
// /<h6>Books rate: <span class="rate">${book[key]}</span></h6>

function renderBooks() {
  var books = getBooks();
  var strHTMLRate = '';
  var strHTMLs = '';
  books.forEach((book) => {
    strHTMLs += `<tr>`;
    for (var key in book) {
      if (key === 'rate') continue;
      if (key === 'price') {
        strHTMLRate += `<div class="modal-${book.id} modal">
      <h4>Book's price:${book[key]}</h4>
      <h5>Book Description</h5>`;
      }
      strHTMLs += `<td>${book[key]}</td>`;
    }
    strHTMLRate += `<p></p>
    <button class="minus" onClick="onMinusButton('${book.id}')">−</button>
    <input type="number" value="0" id="input" />
    <button class="plus" onClick="onPlusButton('${book.id}')">+</button>
    <button onClick="onCloseModal('${book.id}')">Close</button></div>`;
    strHTMLs += `<td><button class="read" onClick="onReadBook('${book.id}')">Read</button></td>`;
    strHTMLs += `<td><button class="update" onClick="onUpadteBook('${book.id}')">Update</button></td>`;
    strHTMLs += `<td><button class="delete" onClick="onRemoveBook('${book.id}')">Delete</button></td>`;
    strHTMLs += `</tr>`;
  });
  document.querySelector('tbody').innerHTML = strHTMLs;
  document.querySelector('.pop').innerHTML = strHTMLRate;
}

function onRemoveBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}
function onPopUp() {
  document.querySelector('.add-book').style.display = 'block';
}
function closePop() {
  document.querySelector('.add-book').style.display = 'none';
}
function onAddBook() {
  var elName = document.querySelector('.name').value;
  var elPrice = document.querySelector('.price').value;

  addBook(elName, elPrice);
  renderBooks();
  document.querySelector('.add-book').style.display = 'none';
}
function onUpadteBook(bookId) {
  console.log(bookId);
  var bookPrice = +prompt("please enter the new book's price");
  console.log(bookPrice);
  updateBook(bookId, bookPrice);
  renderBooks();
}
function onReadBook(bookId) {
  // var book = getBookById(bookId);
  var elModal = document.querySelector(`.modal-${bookId}`);
  // elModal.querySelector('h4 span').innerText = book.price;
  //   elModal.querySelector('p').innerText = car.desc;
  elModal.classList.add('open');
}
function onCloseModal(bookId) {
  console.log(gBooks);
  saveToSto();
  document.querySelector(`.modal-${bookId}`).classList.remove('open');
}
function onMinusButton(bookId) {
  var inputField = document.querySelector(`.modal-${bookId} input`);
  var Idx = getBookIdxById(bookId);
  const currentValue = +inputField.value || 0;
  if (currentValue) {
    inputField.value = currentValue - 1;
    inputField.innerText = inputField.value;
    gBooks[Idx].rate = inputField.value;
    console.log(gBooks[Idx].rate);
    // document.querySelector('h6 .rate').innerText = gBooks[Idx].rate;
  }
}

function onPlusButton(bookId) {
  var inputField = document.querySelector(`.modal-${bookId} input`);
  var Idx = getBookIdxById(bookId);
  const currentValue = +inputField.value || 0;
  if (currentValue < 10) {
    inputField.value = currentValue + 1;
    inputField.innerText = +inputField.value;
    gBooks[Idx].rate = +inputField.value;
    console.log(gBooks[Idx].rate);
    // document.querySelector('h6 .rate').innerText = gBooks[Idx].rate;
  }
}

function onSortBy(filter) {
  gFilterBy = filter.innerText.charAt(0).toLowerCase() + filter.innerText.slice(1);
  renderBooks();
}
