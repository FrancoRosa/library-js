function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.is_read = false;
}

const bookList = [];

function addBook(title, author, pages, arr) {
  let book = new Book(title, author, pages);
  arr.push(book);
}

document.addEventListener("submit", function(event) {
  event.preventDefault();
  let title = document.getElementById("book_title_id").value;
  let author = document.getElementById("book_author_id").value;
  let pages = document.getElementById("book_pages_id").value;
  addBook(title, author, pages, bookList);
  alert("Book added");
})
