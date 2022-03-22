let awesomeBooks = [];

const generateBookID = () => {
  const id = Math.random().toString();
  return id;
};

const addBooks = (title, author) => {
  const awesomeBook = {
    title,
    author,
    id: generateBookID(),
  };
  awesomeBooks.push(awesomeBook);
};

const saveBooks = () => {
  localStorage.setItem('myAwesomeBooks', JSON.stringify(awesomeBooks));
};

const removeBook = (id) => {
  awesomeBooks = awesomeBooks.filter((book) => book.id !== id);
};

const getStorageData = () => {
  const localFormData = JSON.parse(localStorage.getItem('myAwesomeBooks'));
  if (localFormData == null) {
    awesomeBooks = [];
  } else {
    awesomeBooks = localFormData;
  }
};

window.onload = getStorageData();

// Display Books Data

const displayBooks = () => {
  const booksList = document.querySelector('.books');
  booksList.innerHTML = '';
  awesomeBooks.forEach((book) => {
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
      removeBook(book.id);
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

// Get Form Data from Local Storage

const form = document.querySelector('form');
const title = form.querySelector('#title');
const author = form.querySelector('#author');

const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  addBooks(bookTitle, bookAuthor);
  displayBooks();
  saveBooks();
});

getStorageData();
displayBooks();

window.onbeforeunload = () => {
  getStorageData();
  displayBooks();
};