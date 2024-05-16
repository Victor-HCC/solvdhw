# Bookstore Application Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Class Design](#class-design)
3. [Implementation](#implementation)
4. [Demonstration](#demonstration)
5. [Bonus Features](#bonus-features)
6. [Database Interaction](#database-interaction)

## Introduction

This document provides an overview and documentation for the Bookstore application. The application is designed to simulate a bookstore environment where users can browse books, add them to their carts, and place orders.

## Class Design

### Book Class

Represents individual books available in the bookstore.

#### Properties

- **title** (string): The title of the book.
- **author** (string): The author of the book.
- **isbn** (string): The ISBN of the book.
- **price** (number): The price of the book.
- **availability** (boolean): The availability status of the book.
- **pages** (number): The number of pages in the book.
- **language** (string): The language of the book.
- **genre** (string): The genre of the book.

#### Methods

- **constructor(title, author, isbn, price, availability, pages, language, genre)**: Initializes a new instance of the Book class with the provided properties.
- **getters and setters**: Provide access to the properties of the Book class.

### User Class

Represents users of the bookstore.

#### Properties

- **id** (number): The unique identifier of the user.
- **name** (string): The name of the user.
- **email** (string): The email address of the user.

#### Methods

- **constructor(id, name, email)**: Initializes a new instance of the User class with the provided properties.
- **getters and setters**: Provide access to the properties of the User class.
- **makeOrder(cart)**: Creates an order based on the items in the user's cart.

### Cart Class

Simulates a shopping cart functionality. Users can add books, remove books, and calculate the total price of books in the cart.

#### Properties

- **user (User)**: The user associated with the cart.
- **items (array of Book)**: The array of books in the cart.

#### Methods

- **constructor(user)**: Initializes a new instance of the Cart class with the provided user.
- **getters and setters**: Provide access to the properties of the Cart class.
- **addBooks(...books)**: Adds books to the cart.
- **removeBook(book)**: Removes a book from the cart.
- **totalPrice()**: Calculates the total price of the books in the cart.

### Order Class

Represents a user's order. It includes information about the user, the books ordered, and the total price.

#### Properties

- **user (User)**: The user who placed the order.
- **books (array of Book)**: The array of books in the order.
- **total (number)**: The total price of the order.

#### Methods

- **constructor(user, cart)**: Initializes a new instance of the Order class with the provided user and cart.
- **getters**: Provide access to the properties of the Cart class.

### Bookstore Class (Bonus Feature)

Represents the bookstore itself. It has methods to manage its inventory, such as adding/removing books and searching for books by title or ISBN.

#### Properties

- **name (string)**: The name of the bookstore.
- **location (string)**: The location of the bookstore.
- **inventory (array of Book)**: The array of books in the bookstore's inventory.

#### Methods

- **constructor(name, location)**: Initializes a new instance of the Bookstore class with the provided name and location.
- **getters and setters**: Provide access to the properties of the Bookstore class.
- **addBooks(...books)**: Adds books to the inventory.
- **removeBook(book)**: Removes a book from the inventory.
- **searchByTitle(title)**: Searches for a book by its title in the inventory.
- **searchByISBN(isbn)**: Searches for a book by its ISBN in the inventory.

## Implementation

The implementation section contains the actual JavaScript code for the classes and their methods. It includes instantiation of objects, simulation of bookstore interactions, and demonstration of polymorphism.

## Demonstration

Demonstrates how users interact with the application by browsing books, adding them to their carts, and placing orders. It also showcases the interaction between different objects and how polymorphism is utilized.

## Bonus Features

The bonus features section discusses additional functionalities implemented in the application, such as the Bookstore class for managing inventory and searching for books. It explains how these features enhance the application's functionality and user experience.

## Database Interaction

This section describes the interaction with the database, where book and user information is stored persistently.

### Prerequisites

Before running the database interaction functions, make sure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Navigate to the project directory:

```bash
cd <project-directory>
```

2. Install the required dependencies using npm:

```bash
npm install
```

#### The installation process will install the following dependencies from the package.json file:

- **dotenv**: For loading environment variables from a .env file.
- **pg**: PostgreSQL client for Node.js.
- **pg-hstore**: A module for serializing and deserializing JSON data into hstore format.
- **sequelize**: An ORM for Node.js, compatible with various SQL databases.

### Environment Variables
Ensure you have set up the required environment variables in a .env file in the project directory. Here's an example of the .env file:

```
DB_URL=postgres://user:password@host:port/database_name
```
**Note**: The 'database_name' should be created manually before using this URL, for example with psql (PostgreSQL CLI).

### Running the Functions
To run the database interaction functions, use the following commands:

```bash
node hw8.js
```
### Functions

### `createBook(bookObject)`

Creates a new book entry in the database.

- **Parameters**:
  - `bookObject`: An object representing the book to be created, containing properties such as title, author, ISBN, price, etc.

- **Returns**: A promise that resolves to the newly created book object.

### `createUser(userObject)`

Creates a new user entry in the database.

- **Parameters**:
  - `userObject`: An object representing the user to be created, containing properties such as id, name, and email.

- **Returns**: A promise that resolves to the newly created user object.

### `synchronizeDatabase()`

Synchronizes the database with the defined models and performs database operations.

- **Returns**: A promise indicating the completion of the database synchronization process.

#### Example Usage:

```javascript
synchronizeDatabase()
  .then(async () => {
    const newBookInDB = await createBook(book1);
    console.log(newBookInDB.dataValues);

    const newUserInDB = await createUser(karl);
    console.log(newUserInDB.dataValues);
  })
  .catch(error => {
    console.error('Error synchronizing database: ', error);
  })