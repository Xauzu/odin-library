let myLibrary = [];

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    set title(value) {
        this._title = value;
    }

    set author(value) {
        this._author = value;
    }

    set pages(value) {
        this._pages = value;
    }

    set read(value) {
        this._read = value;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }

    get read() {
        return this._read;
    }
}

function createBookElement(book, i) {
    //Display Book
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    if (book.read)
        newBook.classList.add('read');
    newBook.setAttribute('data-id', i);

    let bTitle = document.createElement('div');
    bTitle.textContent = book.title;
    let bAuthor = document.createElement('div');
    bAuthor.textContent = book.author;
    let bPages = document.createElement('div');
    bPages.textContent = book.pages + " pages";
    let bRead = document.createElement('input');
    bRead.setAttribute('type', 'checkbox')
    bRead.classList.add('bookCheckbox');
    bRead.checked = book.read;

    // Event handler to allow user to change checked state
    bRead.addEventListener('change', (e) => {
        let id = newBook.getAttribute('data-id');
        if (e.target.checked) newBook.classList.add('read');
        else newBook.classList.remove('read');

        myLibrary[id]['read'] = e.target.checked;
    })

    newBook.appendChild(bTitle);
    newBook.appendChild(bAuthor);
    newBook.appendChild(bPages);
    newBook.appendChild(bRead);

    // X button to remove book
    let x = document.createElement('button');
    x.textContent = "x";
    x.addEventListener('click', (e) => {
        let id = newBook.getAttribute('data-id');
        myLibrary.splice(id, 1);
        reloadLibrary();
    })
    x.classList.add('removeBookButton', 'hide');

    // Event handler to show X button
    newBook.addEventListener('mouseover', () => {
        x.classList.remove('hide');
    })
    newBook.addEventListener('mouseout', () => {
        x.classList.add('hide');
    })

    newBook.appendChild(x);

    return newBook;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    //Display Book
    const display = document.querySelector('.libraryDisplay');

    display.appendChild(createBookElement(book, myLibrary.length - 1));
}


function reloadLibrary() {
    // Reset display
    const display = document.querySelector('.libraryDisplay');
    display.innerHTML = "";
    
    for (let i = 0; i < myLibrary.length; i++) {
        display.appendChild(createBookElement(myLibrary[i], i));
    }
}

function resetForm() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    document.querySelector('#read').checked = false;

    const data = [title, author, pages];
    for (let i = 0; i < data.length; i++) {
        data[i].value = "";
        data[i].setAttribute('data-input', 0);
    }
}

// Add book button event handler
function setup() {
    // Setup
    {
        const title = document.querySelector('#title');
        const author = document.querySelector('#author');
        const pages = document.querySelector('#pages');

        const inputs = [title, author, pages];
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('focus', () => {
                if (inputs[i].getAttribute('data-input') === '0') inputs[i].setAttribute('data-input', '1');
            });
            inputs[i].addEventListener('change', () => {
                inputs[i].setCustomValidity('');
            });
        }
    }

    const addButton = document.querySelector('#addBookButton');
    addButton.addEventListener('click', (e) => {
        e.preventDefault();

        let title = document.querySelector('#title');
        let author = document.querySelector('#author');
        let pages = document.querySelector('#pages');
        let read = document.querySelector('#read').checked;

        const inputs = [title, author, pages];

        let totalValid = 0;
        for (let i = 0; i < inputs.length; i++) {
            console.log(inputs[i].checkValidity(), inputs[i].validity.customError, inputs[i].value);
            if (inputs[i].checkValidity()) {
                totalValid++;
            }
            else inputs[i].setCustomValidity('Cannot be empty.');
        }

        if (totalValid >= 3) {
            addBookToLibrary(new Book (title.value, author.value, parseInt(pages.value), read));
        
            document.querySelector('.openFormButton').classList.remove('hide');
            document.querySelector('.bookForm').classList.add('hide');
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

const test = 1;

if (test) {
    for (let i = 1; i < 10; i++) {
        addBookToLibrary(new Book("Book " + i, "Author " + i, i * 111, Boolean(i % 2)));
    }

    reloadLibrary();
}