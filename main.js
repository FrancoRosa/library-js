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
    let p1 = document.createElement("p");
    p1.innerHTML = book.title;
    let p2 = document.createElement("p");
    p2.innerHTML = book.author;
    let p3 = document.createElement("p");
    p3.innerHTML = book.pages;
    div1.appendChild(p1);
    div1.appendChild(p2);
    div1.appendChild(p3);
    section.appendChild(div1);
  });
}