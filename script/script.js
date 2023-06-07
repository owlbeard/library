const books = document.querySelector('.contBooks');
const button = document.querySelector('.open-button');
const form = document.querySelector('form');
const LOCAL_STORAGE_KEY = 'library';

let bookNumber = 0;
let lib = [];

button.addEventListener('click', openForm);

/* Displaying the form whenever the user clicks the + sign on top of the screen. */
function openForm() {
  document.getElementById('myForm').style.transform = 'scale(1)';
  document.querySelector('.addBook').style.zIndex = '9';
  books.classList.add('backdrop-blur');
}
/* Hiding the form whenever the user clicks the close button on form or anywhere on container area */
function closeForm() {
  document.getElementById('myForm').style.transform = 'scale(0)';
  document.querySelector('.addBook').style.zIndex = '0';
  books.classList.remove('backdrop-blur');
}

/* Library constructor function */
function Library(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let div = document.createElement('div');
  let label = document.createElement('label');
  let input = document.createElement('input');
  let button = document.createElement('button');
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let checkbox = document.getElementById('read').checked;
  let newBook = new Library(bookNumber, title, author, pages, checkbox);
  lib.push(newBook);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lib));
  div.classList.add('book');
  div.setAttribute('data-index', `${bookNumber}`);
  books.appendChild(div);
  /* Declaring this variable after appending the div element in order to not select "null" */
  let book = document.querySelector(`[data-index="${bookNumber}"]`);
  /* Using the read variables, adding user's input to the book card that will be shown on the screen. */
  book.textContent = `"${newBook.title}"\r\n\r\n`;
  book.textContent += `${newBook.author}\r\n\r\n`;
  book.textContent += `${newBook.pages} pages\r\n\r\n`;

  label.classList.add('textBox');
  label.setAttribute('data-label', `${bookNumber}`);
  input.setAttribute('id', 'textMark');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('data-input', `${bookNumber}`);
  book.appendChild(label);
  /* Again, declaring the variable after appending the label element, to not get "null" as a selector value. */
  let labelSelect = document.querySelector(`[data-label="${bookNumber}"]`);

  labelSelect.textContent = 'Read?   ';
  if (checkbox === true) {
    input.setAttribute('checked', 'checked');
  } else {
    input.removeAttribute('checked');
  }
  labelSelect.appendChild(input);
  let inputSelect = document.querySelector(`[data-input="${bookNumber}"]`);
  inputSelect.addEventListener('click', (e) => {
    let checked = e.target.checked;
    let number = e.target.getAttribute('data-input');
    console.log(number);
    if (checked) lib[number].read = true;
    else lib[number].read = false;
  });
  /*Create a delete button with unique data index every time the user clicks "add" button on form */
  button.classList.add('deleteButton');
  button.setAttribute('data-trash', `${bookNumber}`);
  book.appendChild(button);
  let buttonSelect = document.querySelector(`[data-trash="${bookNumber}"]`);
  buttonSelect.addEventListener('click', (e) => {
    let number = e.target.getAttribute('data-trash');
    book.remove();
    lib.splice(number, 1);
    bookNumber -= 1;
  });

  bookNumber = bookNumber + 1;

  closeForm();
  form.reset();
});
