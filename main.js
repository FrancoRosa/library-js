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
  showBooks(arr);
}

function removeBook(e) {
  //arr.splice(index, 1);
  index = e.path[1].getAttribute("data-attribute");
  bookList.splice(index, 1);
  showBooks(bookList);
}

document.addEventListener("submit", function(event) {
  event.preventDefault();
  let title = document.getElementById("book_title_id").value;
  let author = document.getElementById("book_author_id").value;
  let pages = document.getElementById("book_pages_id").value;
  addBook(title, author, pages, bookList);
})

function showBooks (arr){
  
  section = document.getElementById("books_container");
  section.innerHTML = ''; 
  arr.forEach((book,index) => {
    
    div1 = document.createElement("div");
    div1.setAttribute('data-attribute', index);
    div1.setAttribute('class', 'card');
    let p1 = document.createElement("p");
    p1.innerHTML = `Title: ${book.title}`;
    let p2 = document.createElement("p");
    p2.innerHTML = `Author: ${book.author}`;
    let p3 = document.createElement("p");
    p3.innerHTML = `Number of pages: ${book.pages}`;
    removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove book";
    removeButton.classList = "remove-book-button";
    removeButton.addEventListener("click", removeBook);
    div1.appendChild(removeButton);
    div1.appendChild(p1);
    div1.appendChild(p2);
    div1.appendChild(p3);
    section.appendChild(div1);
  });
}