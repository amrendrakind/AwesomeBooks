/* eslint-disable no-plusplus */
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
  let i = 0;
  library.awesomeBooks.forEach((book) => {
    i++;
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    if (i % 2 !== 0) {
      bookElement.classList.add('odd-color');
    }
    const headTitle = document.createElement('h2');
    headTitle.textContent = `"${book.title}" by ${book.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', () => {
      library.removeBook(book.id);
      displayBooks();
    });
    bookElement.appendChild(headTitle);
    bookElement.appendChild(removeBtn);
    booksList.appendChild(bookElement);
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
  if (author.value && title.value) {
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookID = generateBookID();
    library.addBook(bookTitle, bookAuthor, bookID);
    displayBooks();
    saveBooks();
    title.value = null;
    author.value = null;
  } else {
    event.preventDefault();
  }
});

getStorageData();
displayBooks();

window.onbeforeunload = () => {
  getStorageData();
  displayBooks();
};

// Website Navigation

const list = document.querySelector('.list');
const addNew = document.querySelector('.add-new');
const contact = document.querySelector('.contact');
const booksSelf = document.querySelector('.books-self');
const formAddBook = document.querySelector('.add-book');
const contactInfo = document.querySelector('.contact-info');

const listActive = () => {
  list.classList.add('active-link');
  addNew.classList.remove('active-link');
  contact.classList.remove('active-link');
  booksSelf.classList.remove('hide');
  formAddBook.classList.add('hide');
  contactInfo.classList.add('hide');
};

const addNewActive = () => {
  addNew.classList.add('active-link');
  list.classList.remove('active-link');
  contact.classList.remove('active-link');
  formAddBook.classList.remove('hide');
  contactInfo.classList.add('hide');
  booksSelf.classList.add('hide');
};

const contactActive = () => {
  contact.classList.add('active-link');
  list.classList.remove('active-link');
  addNew.classList.remove('active-link');
  booksSelf.classList.add('hide');
  formAddBook.classList.add('hide');
  contactInfo.classList.remove('hide');
};

list.addEventListener('click', listActive);
addNew.addEventListener('click', addNewActive);
contact.addEventListener('click', contactActive);

window.onload = listActive();
