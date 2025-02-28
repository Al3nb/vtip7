class Book {
    constructor(id, author, title, publisher, pages) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.pages = pages;
    }
}

class BookManager {
    constructor() {
        this.books = new Map();
    }

    addBook(book) {
        this.books.set(book.id, book);
    }

    getAllBooks() {
        return Array.from(this.books.values());
    }

    renderBooks() {
        const bookList = document.getElementById('bookList');
        if (!bookList) {
            console.error('Элемент с id="bookList" не найден!');
            return;
        }

        const source = document.getElementById('book-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template(this.getAllBooks());
        bookList.innerHTML = html;
    }
}

const bookManager = new BookManager();

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookId = document.getElementById('bookId').value;
    const authorName = document.getElementById('authorName').value;
    const bookTitle = document.getElementById('bookTitle').value;
    const publisher = document.getElementById('publisher').value;
    const pageCount = document.getElementById('pageCount').value;

    const book = new Book(bookId, authorName, bookTitle, publisher, pageCount);
    bookManager.addBook(book);

    alert('Книга успешно добавлена!');
});

document.getElementById('showBooks').addEventListener('click', function() {
    bookManager.renderBooks();
});