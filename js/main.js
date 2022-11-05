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
    <td><a href="#" class="btn btn-outline-danger btn-sm delete"></a>X</td>
    `;

    list.appendChild(row);
  }
}

//^ Store Class: Handle Storage

//^ Event: Display Books

//^ Event: Add a Book

//^ Event: Remove a Book
