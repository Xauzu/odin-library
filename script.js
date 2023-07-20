let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBookElement(title, author, pages, read, i) {
    //Display Book
    let newBook = document.createElement('div');
    newBook.classList.add('book');
    if (read)
        newBook.classList.add('read');
    newBook.setAttribute('data-id', i);

    let bTitle = document.createElement('div');
    bTitle.textContent = title;
    let bAuthor = document.createElement('div');
    bAuthor.textContent = author;
    let bPages = document.createElement('div');
    bPages.textContent = pages + " pages";
    let bRead = document.createElement('input');
    bRead.setAttribute('type', 'checkbox')
    bRead.classList.add('bookCheckbox');
    bRead.checked = read;

    // Event handler to allow user to change checked state
    bRead.addEventListener('change', (e) => {
        if (e.target.checked) newBook.classList.add('read');
        else newBook.classList.remove('read');
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

    display.appendChild(createBookElement(book.title, book.author, book.pages, book.read, myLibrary.length - 1));
}


function reloadLibrary() {
    // Reset display
    const display = document.querySelector('.libraryDisplay');
    display.innerHTML = "";
    
    for (let i = 0; i < myLibrary.length; i++) {
        display.appendChild(createBookElement(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].read, i));
    }
}

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