const open = document.querySelector("button");
const form = document.querySelector("form");
const submit = document.querySelector("#submit");
const close = document.querySelector("#close");
const listOfBooks = document.querySelector("#listOfBooks");
let hasReadTheBook;
let clicked = false;

/*
 Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book
 */
 var myLibrary = new Library();
function Book(title, author, numPages, hasRead){
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
  this.changeBookStatus = function(book){
    /* updating the book's dom element */
    this.hasRead = this.hasRead === "Yes" ? "No" : "Yes";
    book.innerHTML = "Title : " + this.title + "<br>" +
                      "Author : " + this.author + "<br>" +
                      "Pages : " + this.numPages + "<br>" +
                      "HasRead : " + this.hasRead + "<br>";
  }

}
function Library(){
  this.books = [];
  this.nBooks = 0;
  this.addBook = function(newBook){
    /* each time we add newBook to the library, we increment the counter */
    this.books[this.nBooks++] = newBook;
    document.querySelector("#numBooks").innerHTML = "# of books in library : "+this.nBooks;
    let object = document.createElement("div");
    let text = document.createElement("div");
    let remove = document.createElement("button");
    let changeBookStatus = document.createElement("button");
    changeBookStatus.innerHTML = "Read";
    changeBookStatus.style.cssText = "background-color : blue; color : white; height : 30px; cursor : pointer;"
    text.innerHTML = "Title : " + newBook.title + "<br>" +
                      "Author : " + newBook.author + "<br>" +
                      "Pages : " + newBook.numPages + "<br>" +
                      "HasRead : " + newBook.hasRead + "<br>";
    object.style.cssText = "border : 3px solid black; padding: 10px; margin : 15px; color : darkblue;"
    object.appendChild(text);
    remove.innerHTML = "Remove";
    remove.style.cssText = "background-color : red; height : 30px; color : white; margin : 10px 10px 10px 0; cursor : pointer;"
    object.appendChild(remove);
    object.appendChild(changeBookStatus);
    listOfBooks.appendChild(object);
  }
  this.removeBook = function(removeBook){
    /* getting the book object from the parentElement */
    let bookObject = removeBook.firstElementChild;
    /* we somehow have to  find the book to remove using findIndex, and remove the book from the books array */
    let indexOfBook = this.books.findIndex(function(x){
      return x.title === bookObject.title && x.author === bookObject.author &&
      x.numPages === bookObject.numPages && x.hasRead === bookObject.hasRead;
    });
    /* remove the book from the array */
    this.books.splice(indexOfBook, 1);
    /* remove the element from the dom */
    listOfBooks.removeChild(removeBook);
    this.nBooks = this.books.length;
    document.querySelector("#numBooks").innerHTML = "# of books in library : "+myLibrary.nBooks;
  }
}

/* adding event listeners */
function hasBeenRead(browser){
  hasReadTheBook = browser;
  clicked = true;
}
open.addEventListener("click", function(){
  form.style.display = "block";
});
close.addEventListener("click", function(){
  form.style.display = "none";
});
submit.addEventListener("click", function(){
  let nameOfAuthor = form.querySelector("[name = nameOfAuthor]").value;
  let title = form.querySelector("[name = title]").value;
  let numPages = form.querySelector("[name = numPages]").value;
  /* we perform error checks to see if the user enters the whole value */
  if(nameOfAuthor.length == 0 || title.length == 0 || numPages.length == 0 || !clicked) return;
  let newBook = new Book(title, nameOfAuthor, numPages, hasReadTheBook);
  myLibrary.addBook(newBook);
});

/* we would also like to remove a book from the library */
listOfBooks.addEventListener("click", function(event){
  let clickedEvent = event.target;
  if(clickedEvent.innerHTML == "Remove"){
    myLibrary.removeBook(clickedEvent.parentElement);
  }
  if(clickedEvent.innerHTML === "Read"){
    let book = clickedEvent.parentElement.firstElementChild;
    var nodes = Array.prototype.slice.call( listOfBooks.children );
    let indexOfBook = nodes.indexOf( clickedEvent.parentElement );
    /* we get the index of the book in the array and also the dom element */
    myLibrary.books[indexOfBook].changeBookStatus(book);
  }
});
