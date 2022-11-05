"use strict";
console.log("main.js");

//^ Book Class: Represents a book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//^ UI Class: Handle UI Tasks

class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     title: "Sapiens: A Brief History of Humankind",
    //     author: " Yuval Noah Harari",
    //     isbn: "567733823",
    //   },
    //   {
    //     title: "Crowds and Power",
    //     author: "Elias Canetti",
    //     isbn: "512121543",
    //   },
    // ];

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-outline-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  // BUILDING ALERT FROM SCRATCH
  // <div class = "alert alert-danger"> Message</div>
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);

    // Vanish is 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//^ Store Class: Handle Storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//^ Event: Display Books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

//^ Event: Add a Book

document.getElementById("book-form").addEventListener("submit", (e) => {
  //Prevet actual submit
  e.preventDefault();

  // get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all the fields", "danger");
  } else {
    // instatiate book
    const book = new Book(title, author, isbn);
    console.log("book ===", book);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to Store

    Store.addBook(book);

    //Show success message
    UI.showAlert("Book Added", "success");

    //clear fields afer submition
    UI.clearFields();
  }
});

//^ Event: Remove a Book

document.getElementById("book-list").addEventListener("click", (e) => {
  //   check the clicks ----> console.log(e.target);

  // Removing book from UI
  UI.deleteBook(e.target);

  // Removing book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Book removed alert
  UI.showAlert("Book Removed", "success");
});
