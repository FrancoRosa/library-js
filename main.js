function Book(title, author, pages) {
  const id = Math.floor(Date.now() + 1000 * Math.random());
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id.toString();
  this.is_read = false;
}

Book.prototype.toggleStatus = function toggleStatus() {
  this.is_read = !this.is_read;
};

function findBookbyId(id, bookList) {
  let arrayIndex = null;
  bookList.forEach((book, index) => {
    if (book.id === id) {
      arrayIndex = index;
    }
  });
  return arrayIndex;
}

function getBookList() {
  const items = JSON.parse(localStorage.getItem('bookList'));
  const parsedItems = [];
  items.forEach(element => {
    const book = new Book(element.title, element.author, element.pages);
    book.is_read = element.is_read;
    book.id = element.id;
    parsedItems.push(book);
  });
  return parsedItems;
}

function updateBookList(array) {
  localStorage.setItem('bookList', JSON.stringify(array));
}

function changeStatus(e) {
  const id = e.path[3].getAttribute('data-attribute');
  const bookList = getBookList();
  const index = findBookbyId(id, bookList);
  bookList[index].toggleStatus();
  e.path[0].innerHTML = bookList[index].is_read ? 'Unread' : 'Read';
  e.path[1].children[1].children[2].innerHTML = bookList[index].is_read ? 'Read.' : 'Not read, yet.';
  updateBookList(bookList);
}

function removeBook(e) {
  const bookList = getBookList();
  const id = e.target.parentElement.parentElement.parentElement.attributes[1].value;
  const index = findBookbyId(id, bookList);
  e.path[1].remove();
  bookList.splice(index, 1);
  updateBookList(bookList);
}

function showBooks(arr) {
  const section = document.getElementById('books_container');
  section.innerHTML = '';
  arr.forEach((book) => {
    const mainContainer = document.createElement('div');
    mainContainer.classList = 'card';
    mainContainer.style = 'margin-top: 1em';
    mainContainer.setAttribute('data-attribute', book.id);
    const cardContainer = document.createElement('div');
    const cardContent = document.createElement('div');
    cardContent.classList = 'card-content';
    cardContainer.classList = 'card';
    cardContainer.appendChild(cardContent);
    mainContainer.appendChild(cardContainer);
    const bookTitle = document.createElement('p');
    bookTitle.classList = 'title is-4';
    bookTitle.innerHTML = `${book.title}`;
    cardContent.appendChild(bookTitle);
    const additionalInfo = document.createElement('div');
    additionalInfo.classList = 'content';
    cardContent.appendChild(additionalInfo);
    additionalInfo.innerHTML = `<p>Author: ${book.author}</p><p>Pages: ${book.pages}</p><p>${book.is_read ? 'Read.' : 'Not read, yet.'}</p>`;
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = book.is_read ? 'Unread' : 'Read';
    toggleButton.classList = 'button';
    toggleButton.addEventListener('click', changeStatus);
    toggleButton.style = 'margin-right: 1em;';
    cardContent.appendChild(toggleButton);
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove book';
    removeButton.classList = 'button is-info';
    removeButton.addEventListener('click', removeBook);
    cardContent.appendChild(removeButton);
    section.appendChild(mainContainer);
  });
}

function addBook(title, author, pages) {
  const arr = getBookList();
  const book = new Book(title, author, pages);
  arr.push(book);
  updateBookList(arr);
  showBooks(arr);
}

function resetValidationMessages() {
  const errors = document.getElementsByClassName('help');
  Array.from(errors).forEach(element => {
    element.style = 'display: none;';
  });
}

function validateInput(title, author, pages) {
  let valid = true;
  resetValidationMessages();
  if (title.length === 0) {
    document.getElementById('title_error_id').style = 'display: block;';
    valid = false;
  }
  if (author.length === 0) {
    document.getElementById('author_error_id').style = 'display: block;';
    valid = false;
  }
  if (!Number.isInteger(parseInt(pages, 10))) {
    document.getElementById('pages_error_id').style = 'display: block;';
    valid = false;
  }

  return valid;
}

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('book_title_id').value;
  const author = document.getElementById('book_author_id').value;
  const pages = document.getElementById('book_pages_id').value;
  if (validateInput(title, author, pages)) {
    addBook(title, author, pages);
    resetValidationMessages();
    document.getElementById('book_title_id').value = '';
    document.getElementById('book_author_id').value = '';
    document.getElementById('book_pages_id').value = '';
  }
});

window.onload = () => {
  if (!localStorage.getItem('bookList')) localStorage.setItem('bookList', JSON.stringify([]));
  const books = getBookList();
  showBooks(books);
};