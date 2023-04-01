function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function Library(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const books = document.querySelector(".contBooks");
const add = document.querySelector(".add");
const form = document.querySelector("form");

let cardNumber = 1

form.addEventListener("submit", (event) => {
  event.preventDefault()
  let div = document.createElement("div");
  let label = document.createElement("label");
  let input = document.createElement("input");
  let button = document.createElement("button");
  div.classList.add("book");
  div.setAttribute("data-index", `${cardNumber}`);
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let checkbox = document.getElementById("read").checked;
  let newBook = new Library(`${title}`, `${author}`, `${pages}`, `${checkbox}`);
  books.appendChild(div);
  let book = document.querySelector(`[data-index="${cardNumber}"]`);
  book.textContent = `"${newBook.title}"\r\n\r\n`;
  book.textContent += `${newBook.author}\r\n\r\n`;
  book.textContent += `${newBook.pages} pages\r\n\r\n`;
  label.classList.add("textBox")
  label.setAttribute("data-label", `${cardNumber}`);
  input.setAttribute("id", "textMark")
  input.setAttribute("type", "checkbox");
  book.appendChild(label);
  let labelSelect = document.querySelector(`[data-label="${cardNumber}"]`);
  labelSelect.textContent = "Read?   ";
  if (checkbox === true) {
    input.setAttribute("checked", "checked");
  }else {
    input.removeAttribute("checked");
  }
  labelSelect.appendChild(input);
  button.classList.add("deleteButton");
  button.setAttribute("data-trash", `${cardNumber}`);
  book.appendChild(button);
  let buttonSelect = document.querySelector(`[data-trash="${cardNumber}"]`);
  buttonSelect.addEventListener("click", () => book.remove());
  cardNumber = cardNumber + 1;
  closeForm();
  form.reset();
});