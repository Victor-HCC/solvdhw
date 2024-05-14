/**
 * Module for configuring Sequelize and defining models.
 * @module database
 */

const { Sequelize, DataTypes } = require('sequelize')

//Load enviroment variables from .env
require('dotenv').config()

const { DB_URL } = process.env

/**
 * Represents the Sequelize instance used for conecting to the database
 * @type {Sequelize}
 */
const sequelize = new Sequelize(DB_URL, {
  logging: false, 
  native: false, 
});

/**
 * Represents a book in the database.
 * @typedef {Object} Book
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} isbn - The ISBN of the book (primary key).
 * @property {number} price - The price of the book.
 * @property {boolean} availability - The availability of the book.
 * @property {number} pages - The number of pages in the book.
 * @property {string} language - The language of the book.
 * @property {string} genre - The genre of the book.
 */

/**
 * The Book model.
 * @type {Model<Book>}
 */
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

/**
 * Represents a user in the database.
 * @typedef {Object} User
 * @property {number} id - The ID of the user (primary key, auto-increment).
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user (unique).
 */

/**
 * The User model.
 * @type {Model<User>}
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

/**
 * Synchronize the models with the database.
 * @returns {Promise<void>} A promise indicating the completion of the synchronization process.
 */
async function synchronizeDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database: ', error);
  }
}

module.exports = { Book, User, synchronizeDatabase }