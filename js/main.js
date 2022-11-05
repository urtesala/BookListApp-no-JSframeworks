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
    const StoredBooks = [
      {
        title: "Sapiens: A Brief History of Humankind",
        author: " Yuval Noah Harari",
        isbn: "567733823",
      },
      {
        title: "Crowds and Power",
        author: "Elias Canetti",
        isbn: "512121543",
      },
    ];

    const books = StoredBooks;

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

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//^ Store Class: Handle Storage

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

  // instatiante book
  const book = new Book(title, author, isbn);
  console.log("book ===", book);

  // Add book to UI
  UI.addBookToList(book);

  //clear fields afer submition
  UI.clearFields();
});

//^ Event: Remove a Book
