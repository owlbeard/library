/* Displaying the form whenever the user clicks the + sign on top of the screen. */
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
/* Hiding the form whenever the user clicks the close button on form or anywhere on container area */
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
/* Library constructor function */
function Library(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const books = document.querySelector(".contBooks");
const add = document.querySelector(".add");
const form = document.querySelector("form");

let bookNumber = 1

form.addEventListener("submit", (event) => {
  event.preventDefault()
  
  let div = document.createElement("div");
  let label = document.createElement("label");
  let input = document.createElement("input");
  let button = document.createElement("button");
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let checkbox = document.getElementById("read").checked;
  let newBook = new Library(`${title}`, `${author}`, `${pages}`, `${checkbox}`);

  div.classList.add("book");
  div.setAttribute("data-index", `${bookNumber}`);
  books.appendChild(div);
  /* Declaring this variable after appending the div element in order to not select "null" */
  let book = document.querySelector(`[data-index="${bookNumber}"]`);
  /* Using the read variables, adding user's input to the book card that will be shown on the screen. */
  book.textContent = `"${newBook.title}"\r\n\r\n`;
  book.textContent += `${newBook.author}\r\n\r\n`;
  book.textContent += `${newBook.pages} pages\r\n\r\n`;
  
  label.classList.add("textBox")
  label.setAttribute("data-label", `${bookNumber}`);
  input.setAttribute("id", "textMark")
  input.setAttribute("type", "checkbox");
  book.appendChild(label);
  /* Again, declaring the variable after appending the label element, to not get "null" as a selector value. */
  let labelSelect = document.querySelector(`[data-label="${bookNumber}"]`);
  
  labelSelect.textContent = "Read?   ";
  if (checkbox === true) {
    input.setAttribute("checked", "checked");
  }else {
    input.removeAttribute("checked");
  }
  labelSelect.appendChild(input);
  /*Create a delete button with unique data index every time the user clicks "add" button on form */
  button.classList.add("deleteButton");
  button.setAttribute("data-trash", `${bookNumber}`);
  book.appendChild(button);
  let buttonSelect = document.querySelector(`[data-trash="${bookNumber}"]`);
  buttonSelect.addEventListener("click", () => book.remove());
  
  bookNumber = bookNumber + 1;
  
  closeForm();
  form.reset();
});