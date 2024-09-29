class Book {
    static #idCounter = 0;
    static #getID() {
        this.#idCounter++;
        return this.#idCounter;

    }

    constructor({ title, author, numberOfPages, isRead }) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.id = Book.#getID();
    }

    info() {
        return(`${title} by ${author}, ${numberOfPages}, ${isRead ? 'already read it' : 'not read yet'}`);
    }
}

const Library = function() {
    let myLibrary = [];

    const init = () => {
        const dialog = document.querySelector('dialog');
        const form = document.querySelector('form');

        document.querySelector('main > button').addEventListener('click', () => {
            dialog.showModal();
        });

        dialog.addEventListener('click', (event) => {
            const rect = form.getBoundingClientRect();
            if (
            (event.clientX < rect.left) || (event.clientX > rect.right) ||
            (event.clientY < rect.top) || (event.clientY > rect.bottom)
            ) {
                dialog.close();
            }
        });
        document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
            e.preventDefault();
            const title = document.querySelector('#title').value;
            const author = document.querySelector('#author').value;
            const numberOfPages = document.querySelector('#pages').value;
            const isRead = document.querySelector('#read').checked;
        
            addBookToLibrary({ title, author, numberOfPages, isRead });
            clearInputs();
            dialog.close();
            displayBooks();
        });
    };

    const addBookToLibrary = (bookInfo) => {
        const newBook = new Book(bookInfo);
        myLibrary.push(newBook);
    }

    const displayBooks = () => {
        const container = document.querySelector('.books-container');
        container.innerHTML = '';
        myLibrary.forEach(book => {
            container.appendChild(createBookCard(book));
        });
    }

    const createBookCard = ({ title, author, numberOfPages, isRead, id }) => {
        const card = document.createElement('div');
        card.classList.add('book-card');
    
        const titleEle = document.createElement('p');
        titleEle.textContent = title;
    
        const authorEle = document.createElement('p');
        authorEle.textContent = author;
    
        const pagesEle = document.createElement('p');
        pagesEle.textContent = String(numberOfPages);
    
        const isReadBtn = document.createElement('button');
        if (isRead) {
            isReadBtn.textContent = 'Read';
            isReadBtn.classList.add('read-btn');
        } else {
            isReadBtn.textContent = 'Not Read';
            isReadBtn.classList.add('not-read-btn');
        }
    
        isReadBtn.addEventListener('click', () => {
            if (isRead) {
                isReadBtn.textContent = 'Not Read';
                isReadBtn.classList.remove('read-btn');
                isReadBtn.classList.add('not-read-btn');
            } else {
                isReadBtn.textContent = 'Read';
                isReadBtn.classList.remove('not-read-btn');
                isReadBtn.classList.add('read-btn');
            }
            isRead = !isRead;
        });
    
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
    
        removeBtn.addEventListener('click', () => {
            myLibrary = myLibrary.filter(book => book.id !== id);
            displayBooks();
        });
    
        card.appendChild(titleEle);
        card.appendChild(authorEle);
        card.appendChild(pagesEle);
        card.appendChild(isReadBtn);
        card.appendChild(removeBtn);
    
        return card;
    }

    const clearInputs = () => {
        document.querySelectorAll('input[type="text"], input[type="number"]')
        .forEach((input) => {
            input.value = '';
        })
    };

    return { init };
}();

Library.init();

