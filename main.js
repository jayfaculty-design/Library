const addBtn = document.getElementById("add");
const closeBtn = document.getElementById("close-form");
const addForm = document.getElementById("form");
const maintitle = document.getElementById("title");
const mainAuthor = document.getElementById("author");
const mainPages = document.getElementById("pages");
const mainHasRead = document.getElementById("hasRead");
const addBook = document.getElementById("add-book");
const mainContainer = document.getElementById("main-container");
const sideBar = document.getElementById("side-bar");
const topContainer = document.getElementById("top-container");

const myLibrary = [];

function saveToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}
function loadFromLocalStorage() {
  const storedLibrary = localStorage.getItem("library");
  if (storedLibrary) {
    myLibrary.push(...JSON.parse(storedLibrary));
    myLibrary.forEach((book) => renderBook(book)); // Render each book
  }
}

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}
addBtn.addEventListener("click", () => {
  sideBar.style.left = "0px";
  topContainer.style.paddingLeft = "300px";
});
closeBtn.addEventListener("click", () => {
  sideBar.style.left = "-999px";
  topContainer.style.paddingLeft = "50px";
});

addBook.addEventListener("click", () => {
  if (!maintitle.value.trim() || !mainAuthor.value.trim() || !mainPages.value) {
    alert("Please fill out all fields before adding a book.");
    return;
  }
  // create an instance of a new book
  const book = new Book(
    maintitle.value,
    mainAuthor.value,
    mainPages.value,
    mainHasRead.checked
  );
  myLibrary.push(book);
  renderBook(book);
  saveToLocalStorage();

  (maintitle.value = ""),
    (mainAuthor.value = ""),
    (mainPages.value = ""),
    (mainHasRead.checked = true);
});

// render a single book
function renderBook(book) {
  let booksContainer = document.createElement("div");
  let titleC = document.createElement("h2");
  let authorC = document.createElement("p");
  let pagesC = document.createElement("p");
  let hasReadC = document.createElement("p");
  let deleteBtn = document.createElement("img");
  let deleteContainer = document.createElement("div");

  booksContainer.className = "book-card"; // add class for styling
  deleteContainer.className = "delete";

  deleteBtn.src = "images/trash-alt.svg";
  deleteBtn.style.width = "20px";
  deleteContainer.appendChild(deleteBtn);
  deleteContainer.addEventListener("click", () => {
    booksContainer.remove(); // remove from the DOM
    const index = myLibrary.indexOf(book);
    if (index !== -1) myLibrary.splice(index, 1); // remove from array
    saveToLocalStorage();
  });

  titleC.textContent = book.title || "No Title";
  authorC.textContent = book.author || "No author";
  pagesC.textContent = `${book.pages || 0} pages`;
  hasReadC.textContent = `${book.hasRead ? "Has Read" : "Not Read"} `;

  mainContainer.style.cssText =
    "display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap;";

  booksContainer.append(deleteContainer, titleC, authorC, pagesC, hasReadC);
  mainContainer.appendChild(booksContainer);
}

window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
