let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    //Display Book
    const display = document.querySelector('.libraryDisplay');
    let newBook = document.createElement('div');
    newBook.setAttribute('class', 'book');

    let title = document.createElement('div');
    title.textContent = book.title;
    let author = document.createElement('div');
    author.textContent = book.author;
    let pages = document.createElement('div');
    pages.textContent = book.pages;
    let read = document.createElement('div');
    read.textContent = book.read;

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);

    display.appendChild(newBook);
}

function displayLibrary() {

}

// for (let i = 1; i < 10; i++) {
//     addBookToLibrary(new Book("Book " + i, "Author " + i, i * 111, Boolean(i % 2)));
// }
//
// console.table(myLibrary);

// Add book button event handler
function setup() {
    const button = document.querySelector('#addBookButton');
    button.addEventListener('click', (e) => {
        e.preventDefault();

        addBookToLibrary(new Book (
            document.querySelector('#title').value,
            document.querySelector('#author').value,
            parseInt(document.querySelector('#pages').value),
            document.querySelector('#read').value === 'on' ? true : false
        ));

    });
}

setup();