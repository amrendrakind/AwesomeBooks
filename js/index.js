class Library {
  constructor(Title, Author, ID) {
    this.title = Title;
    this.author = Author;
    this.id = ID;
  }

  addBook = (bookTitle, bookAuthor, bookID) => {
    const awesomeBook = {
      title: bookTitle,
      author: bookAuthor,
      id: bookID,
    };
    this.awesomeBooks.push(awesomeBook);
  };

  removeBook = (id) => {
    this.awesomeBooks = this.awesomeBooks.filter((book) => book.id !== id);
  };
}

const library = new Library();
library.awesomeBooks = [];

const saveBooks = () => {
  localStorage.setItem('myAwesomeBooks', JSON.stringify(library.awesomeBooks));
};

const getStorageData = () => {
  const localFormData = JSON.parse(localStorage.getItem('myAwesomeBooks'));
  if (localFormData == null) {
    library.awesomeBooks = [];
  } else {
    library.awesomeBooks = localFormData;
  }
};

window.onload = getStorageData();

// Display Books Data

const displayBooks = () => {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  library.awesomeBooks.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const headTitle = document.createElement('h2');
    headTitle.classList.add('title');
    headTitle.textContent = book.title;

    const headAuthor = document.createElement('h2');
    headAuthor.classList.add('author');
    headAuthor.textContent = book.author;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', () => {
      library.removeBook(book.id);
      displayBooks();
    });
    bookElement.appendChild(headTitle);
    bookElement.appendChild(headAuthor);
    bookElement.appendChild(removeBtn);
    booksList.appendChild(bookElement);
    const hr = document.createElement('hr');
    booksList.appendChild(hr);
  });
  saveBooks();
};

const generateBookID = () => {
  const id = Math.random().toString();
  return id;
};

// Get Form Data from Local Storage

const form = document.querySelector('form');
const title = form.querySelector('#title');
const author = form.querySelector('#author');

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookID = generateBookID();
  library.addBook(bookTitle, bookAuthor, bookID);
  displayBooks();
  saveBooks();
});

getStorageData();
displayBooks();

window.onbeforeunload = () => {
  getStorageData();
  displayBooks();
};