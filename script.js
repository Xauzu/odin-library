let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {

}

for (let i = 1; i < 10; i++) {
    addBookToLibrary(new Book("Book " + i, "Author " + i, i * 111, Boolean(i % 2)));
}

console.table(myLibrary);