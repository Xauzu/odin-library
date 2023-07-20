let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBookElement(title, author, pages, read) {
    //Display Book
    let newBook = document.createElement('div');
    newBook.setAttribute('class', 'book');

    let bTitle = document.createElement('div');
    bTitle.textContent = title;
    let bAuthor = document.createElement('div');
    bAuthor.textContent = author;
    let bPages = document.createElement('div');
    bPages.textContent = pages;
    let bRead = document.createElement('div');
    bRead.textContent = read;

    newBook.appendChild(bTitle);
    newBook.appendChild(bAuthor);
    newBook.appendChild(bPages);
    newBook.appendChild(bRead);

    return newBook;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    //Display Book
    const display = document.querySelector('.libraryDisplay');

    display.appendChild(createBookElement(book.title, book.author, book.pages, book.read));
}


function displayLibrary() {
    // Reset display
    const display = document.querySelector('.libraryDisplay');
    display.childNodes.forEach(element => {
        display.removeChild(element);
    });
    
    myLibrary.forEach(book => {
        
    });
}

// for (let i = 1; i < 10; i++) {
//     addBookToLibrary(new Book("Book " + i, "Author " + i, i * 111, Boolean(i % 2)));
// }
//
// console.table(myLibrary);

function resetForm() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').checked = false;
}

// Add book button event handler
function setup() {
    const addButton = document.querySelector('#addBookButton');
    addButton.addEventListener('click', (e) => {
        e.preventDefault();

        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = parseInt(document.querySelector('#pages').value);
        let read = document.querySelector('#read').checked;

        if (title !== "" && author != "" && pages > 0) {
            addBookToLibrary(new Book (title, author, pages, read));
        
            document.querySelector('.openFormButton').classList.remove('hide');
            document.querySelector('.bookForm').classList.add('hide');
        }
        else {

        }
    });

    const cancelButton = document.querySelector('#cancelButton');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelector('.openFormButton').classList.remove('hide');
        document.querySelector('.bookForm').classList.add('hide');
    });

    const openFormButton = document.querySelector('.openFormButton');
    openFormButton.addEventListener('click', (e) => {
        resetForm();

        document.querySelector('.bookForm').classList.remove('hide');
        document.querySelector('.openFormButton').classList.add('hide');
    })
}

setup();