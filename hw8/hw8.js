/*
### **Part 1: Class Design**

1. **Book Class**: Create a class called `Book` to represent individual books. Each book should have properties like title, author, ISBN, price, and availability.
2. **User Class**: Create a class called `User` to represent users of the bookstore. Users should have properties like name, email, and a unique user ID.
3. **Cart Class**: Design a class called `Cart` to simulate a shopping cart. It should have methods to add books, remove books, and calculate the total price of the books in the cart.
4. **Order Class**: Create an `Order` class to represent a user's order. It should include information about the user, the books ordered, and the total price.
*/

/**
 * Represents a book in the bookstore
 */
class Book {
  /**
   * Creates an instance of Book.
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} isbn - The ISBN of the book.
   * @param {number} price - The price of the book.
   * @param {boolean} availability - The availability of the book.
   * @param {number} pages - The number of pages in the book.
   * @param {string} language - The language of the book.
   * @param {string} genre - The genre of the book.
   */
  constructor(title, author, isbn, price, availability, pages, language, genre) {
    this._title = title
    this._author = author
    this._isbn = isbn
    this._price = price
    this._availability = availability
    this._pages = pages
    this._language = language
    this._genre = genre
  }

  /**
   * Getters
   */
  get title() {
    return this._title
  }
  get author() {
    return this._author
  }
  get isbn() {
    return this._isbn
  }
  get price() {
    return this._price
  }
  get availability() {
    return this._availability
  }
  get pages() {
    return this._pages
  }
  get language() {
    return this._language
  }
  get genre() {
    return this._genre
  }

  /**
   * Setters
   */
  set title(title) {
    this._title = title
  }
  set author(author) {
    this._author = author
  }
  set isbn(isbn) {
    this._isbn = isbn
  }
  set price(price) {
    this._price = price
  }
  set availability(availability) {
    this._availability = availability
  }
  set pages(pages) {
    this._pages = pages
  }
  set language(language) {
    this._language = language
  }
  set genre(genre) {
    this._genre = genre
  }

}

/**
 * Represents a user of the bookstore.
 */
class User {
  /**
   * Creates an instance of User.
   * @param {number} id - The ID of the user.
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   */
  constructor(id, name, email) {
    this._id = id
    this._name = name
    this._email = email
  }

  /**
   * Getters
   */
  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get email() {
    return this._email
  }

  /**
   * Setters
   */
  set id(id) {
    this._id = id
  }
  set name(name) {
    this._name = name
  }
  set email(email) {
    this._email = email
  }

  /**
   * Creates an order based on the items in the user's cart.
   * @param {Cart} cart - The cart containing the items to be ordered.
   * @returns {Order} The order created
   */
  makeOrder(cart) {
    const order = new Order(this, cart)
    return order
  }
}

/**
 * Represents a shopping cart for a user.
 */
class Cart {
  /**
   * Creates an instance of Cart.
   * @param {User} user - The user associated with the cart.
   */
  constructor(user) {
    this._user = user
    this._items = []
  }

  /**
   * Getters
   */
  get user() {
    return this._user
  }
  get items() {
    return this._items
  }

  /**
   * Setters
   */
  set user(user) {
    this._user = user
  }

  /**
   * Adds books to the cart.
   * @param  {...Book} books - The books to be added to the cart.
   */
  addBooks(...books) {
    this._items.push(...books)
  }

  /**
   * Removes a book from the cart.
   * @param {Book} book - The book to be removed from the cart.
   */
  removeBook(book) {
    this._items = this.items.filter(bookCart => bookCart.isbn !== book.isbn)
  }

  /**
   * Calculates the total price of the books in the cart.
   * If the price is equal exceeds 100 applies a 5% discount
   * @returns {number} The total price of the books in the cart.
   */
  totalPrice() {
    let total = this.items.reduce((acc, book) => acc + book.price, 0)
    if(total >= 100) {
      total *= .95
    }
    return parseFloat(total.toFixed(2))
  }
}

/**
 * Represents an order placed by a user.
 */
class Order {
  /**
   * Creates an instence of Order.
   * @param {User} user - The user who placed the order.
   * @param {Cart} cart - The cart of the user.
   */
  constructor(user, cart) {
    this._user = user
    this._books = cart.items
    this._total = cart.totalPrice()
  }

  /**
   * Getters
   */
  get user() {
    return this._user
  }
  get books() {
    return this._books
  }
  get total() {
    return this._total
  }
}

/*
### **Part 2: Implementation**

1. **Create Objects**: Instantiate multiple `Book` objects, representing different books available in the bookstore. Also, create a few `User` objects.
2. **Add Books to Cart**: Simulate users adding books to their cart by creating instances of the `Cart` class and using its methods.
3. **Place Orders**: Implement the process of placing an order. Users should be able to create instances of the `Order` class, specifying the books they want to purchase.
*/

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 12.99, true, 180, "English", "Fiction");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 10.99, true, 281, "English", "Fiction");
const book3 = new Book("1984", "George Orwell", "9780451524935", 9.99, true, 328, "English", "Science Fiction");
const book4 = new Book("The Catcher in the Rye", "J.D. Salinger", "9780316769488", 8.99, true, 224, "English", "Fiction");
const book5 = new Book("The Hobbit", "J.R.R. Tolkien", "9780547928227", 14.99, true, 304, "English", "Fantasy");
const book6 = new Book("The Da Vinci Code", "Dan Brown", "9780307474278", 11.99, true, 597, "English", "Thriller");
const book7 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "9781408855652", 15.99, true, 352, "English", "Fantasy");
const book8 = new Book("Le Petit Prince", "Antoine de Saint-Exupéry", "9783125971400", 9.99, true, 96, "French", "Children's Literature");
const book9 = new Book("Crime and Punishment", "Fyodor Dostoevsky", "9780679734505", 13.99, true, 671, "Russian", "Philosophical Fiction");

const user1 = new User(1, 'Karl', 'karl@email.com')
const user2 = new User(2, 'John', 'john@email.com')

const cartUser1 = new Cart(user1)
cartUser1.addBooks(book1, book3, book5)
const orderUser1 = user1.makeOrder(cartUser1)

console.log(cartUser1);
console.log(cartUser1.totalPrice());
console.log(orderUser1);
console.log(orderUser1.total);

/*
### **Part 3: Demonstration**

1. **Create a Scenario**: Design a scenario where users browse books, add them to their carts, and place orders. Simulate interactions between users, carts, and orders.
2. **Interaction**: Demonstrate how objects of different classes interact with each other. For example, a user interacts with a cart, and a cart interacts with orders.
3. **Polymorphism**: Utilize polymorphism by treating different types of books (e.g., fiction, non-fiction) uniformly when users add them to the cart.
*/


const karl = new User(1, 'Karl', 'karl@email.com')
const john = new User(2, 'John', 'john@email.com')
const karen = new User(3, 'Karen', 'karen@email.com')

const books = [book1, book2, book3, book4, book5, book6, book7, book8, book9]

/**
 * Function to search a book by its title
 * @param {string} book - The title of the book
 * @returns {Book} Book searched or undefined if don't exist
 */
const bookSearched = book => {
  return books.filter(item => item.title.toLowerCase() === book.toLowerCase())[0]
}

//Karl wants to search the book '1984'
const karlSearch = bookSearched('1984')

//If the book exist Karl will add it to his cart and then make an order
if(karlSearch) {
  const karlCart = new Cart(karl)
  karlCart.addBooks(karlSearch)
  const karlOrder = karl.makeOrder(karlCart)
  console.log(karlOrder);
}

const johnCart = new Cart(john)

//John adds some books to his cart
johnCart.addBooks(book2, book4, book6)

//Removes a book
johnCart.removeBook(book4)

//Search a book to add to his cart
const johnSearch = bookSearched('The Hobbit')
if(johnSearch) {
  johnCart.addBooks(johnSearch)
}

//John place his order
const johnOrder = john.makeOrder(johnCart)
console.log(johnOrder)

//Karl add both fiction and non-fiction books to his cart
const karlCart = new Cart(karl)
karlCart.addBooks(book1, book3, book5); //Fiction books
karlCart.addBooks(book8, book9); //Non-fiction books

//Karl place his order
const karlOrder = karl.makeOrder(karlCart);
console.log(karlOrder);


//Karen many book to get the discount
const cartKaren = new Cart(karen)
cartKaren.addBooks(book1, book2, book5, book6, book3, book9, book8, book9, book4)
console.log(cartKaren);
console.log(cartKaren.totalPrice());

/*
### **Part 4: Documentation**

1. **Documentation**: Provide clear and concise comments and documentation for your code. Explain the purpose of each class, method, and property. Describe the interaction between different objects and how encapsulation is maintained.
*/

/*
### **Submission**

Submit your JavaScript program along with detailed documentation and comments that explain your code. Ensure that your code is well-structured and adheres to best practices in object-oriented programming.

### **Example**

Here's a simplified example structure to give you an idea of what your code might look like:

class Book {
  constructor(title, author, isbn, price, availability) {
    // Properties and methods...
  }
}

class User {
  constructor(name, email, userId) {
    // Properties and methods...
  }
}

class Cart {
  constructor(user) {
    // Properties and methods...
  }
}

class Order {
  constructor(user, books) {
    // Properties and methods...
  }
}

// Instantiate objects and simulate bookstore interactions...
*/

/*
### **Bonus (Optional)**

Implement additional features such as searching for books, applying discounts, handling payments, or integrating a database to store book and user information.
*/


/**
 * Represents a bookstore
 */
class Bookstore {
  /**
   * Creates an instance of Bookstore
   * @param {string} name - The name of the bookstore
   * @param {string} location - The location of the bookstore
   */
  constructor(name, location) {
    this._name = name
    this._location = location
    this._inventory = []
  }

  /**
   * Getters
   */
  get name() {
    return this._name
  }
  get location() {
    return this._location
  }
  get inventory() {
    return this._inventory
  }

  /**
   * Setters
   */
  set name(name) {
    this._name = name
  }
  set location(location) {
    this._location = location
  }

  /**
   * Adds books to the inventory.
   * @param  {...Book} books - The books to be added to the inventory.
   */
  addBooks(...books) {
    this._inventory.push(...books)
  }

  /**
   * Removes a book from the inventory.
   * @param {Book} book - The book to be removed from the inventory.
   */
  removeBook(book) {
    this._inventory = this.inventory.filter(bookInventory => bookInventory.isbn !== book.isbn)
  }

  /**
   * Search a book by the title
   * @param {string} title - The title of the searched book.
   * @returns {Book} The book searched or a message if there is no result.
   */
  searchByTitle(title) {
    const result = this.inventory.filter(book => book.title === title)

    return result.length > 0 ? result[0] : `No result for ${title}`
  }

  /**
   * Search a book by its ISBN
   * @param {isbn} isbn - The ISBN of the searched book.
   * @returns {Book} The book searched or a message if there is no result.
   */
  searchByISBN(isbn) {
    const result = this.inventory.filter(book => book.isbn === isbn)

    return result.length > 0 ? result[0] : `No result for ${isbn}`
  }
}

//Instance of Bookstore and tests for the search functions
const bestBookstore = new Bookstore('The Best Bookstore', 'Spring Av. 123')
bestBookstore.addBooks(...books)
console.log('Inventory: ', bestBookstore.inventory);
console.log(bestBookstore.searchByTitle('1984'));
console.log(bestBookstore.searchByTitle('Misery'));
console.log(bestBookstore.searchByISBN('9781408855652'));
console.log(bestBookstore.searchByISBN('9781408855654'));



/**
 * Interaction with the database
 */

const { Book: BookModel, User: UserModel, synchronizeDatabase } = require('./db')

/**
 * Creates a new book entry in the database.
 * @async
 * @param {Object} bookObject - An object representing the book to be created.
 * @param {string} bookObject.title - The title of the book.
 * @param {string} bookObject.author - The author of the book.
 * @param {string} bookObject.isbn - The ISBN of the book.
 * @param {number} bookObject.price - The price of the book.
 * @param {boolean} bookObject.availability - The availability status of the book.
 * @param {number} bookObject.pages - The number of pages in the book.
 * @param {string} bookObject.language - The language of the book.
 * @param {string} bookObject.genre - The genre of the book.
 * @returns {Promise<Object>} A promise that resolves to the newly created book object.
 */
const createBook = async (bookObject) => {
  const { title, author, isbn, price, availability, pages, language, genre } = bookObject
  const newBook = await BookModel.create({title, author, isbn, price, availability, pages, language, genre})
  return newBook
}

/**
 * Creates a new user entry in the database.
 * @async
 * @param {Object} userObject - An object representing the user to be created.
 * @param {number} userObject.id - The id of the user.
 * @param {string} userObject.name - The name of the user.
 * @param {string} userObject.email - The email of the user.
 * @returns {Promise<Object>} A promise that resolves to the newly created user object.
 */
const createUser = async (userObject) => {
  const { id, name, email } = userObject
  const newUser = await UserModel.create({id, name, email})
  return newUser
}

/**
 * Synchronizes the database with the defined models and performs database operations.
 * @returns {Promise<void>} A promise indicating the completion of the database synchronization process.
 */
synchronizeDatabase()
  .then(async () => {
    // Example: Creating a new book
    const newBookInDB = await createBook(book1)
    console.log(newBookInDB.dataValues);

    // Example: Creating a new user
    const newUserInDB1 = await createUser(karl)
    console.log(newUserInDB1.dataValues);

    // Example: Creating another new user
    const newUserInDB2 = await createUser(john)
    console.log(newUserInDB2.dataValues);
  })
  .catch(error => {
    console.error('Error synchronizing database: ', error);
  })
