-- Création de la base de données (si elle n'existe pas)
CREATE DATABASE IF NOT EXISTS biglam1 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utiliser la base de données
USE biglam1;

-- Création des TABLES

-- USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NULL,
    isAdmin TINYINT DEFAULT 0,
    password VARCHAR(60) NOT NULL,
    createdDate DATETIME NOT NULL

);
-- ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS `addresses` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    addressLine1 VARCHAR(100) NOT NULL,
    addressLine2 VARCHAR(100) NOT NULL,
    zipCode VARCHAR(10) NULL,
    phone VARCHAR(15),
    users_id INT UNSIGNED,
    FOREIGN KEY (users_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL

);

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `categories` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS `products` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subTitle VARCHAR(255),
    picture VARCHAR(30),
    alt VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    ref CHAR(13) UNIQUE NOT NULL,
    quantityInStock SMALLINT UNSIGNED NOT NULL,
    categories_id INT UNSIGNED,
    FOREIGN KEY (categories_id) REFERENCES categories(id)
);


-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS `orders` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    orderedDate DATETIME NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50),
    users_id INT UNSIGNED,
    FOREIGN KEY (users_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- ORDER_DETAILS TABLE
CREATE TABLE IF NOT EXISTS `order_details` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantity INT UNSIGNED NOT NULL,
    priceEach DECIMAL(10, 2) NOT NULL,
    orders_id INT UNSIGNED,
    products_id INT UNSIGNED,
    FOREIGN KEY (orders_id) REFERENCES `orders`(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (products_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);
