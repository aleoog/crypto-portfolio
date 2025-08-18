
CREATE DATABASE IF NOT EXISTS crypto_db;
USE crypto_db;


CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass_hash VARCHAR(512) NOT NULL
);


CREATE TABLE IF NOT EXISTS crypto_coin (
    id_crypto_coin INT AUTO_INCREMENT PRIMARY KEY,
    coin_id VARCHAR(255) NOT NULL,
    symbol VARCHAR(255) NOT NULL,
    image_url VARCHAR(512)
);


CREATE TABLE IF NOT EXISTS users_crypto_coin (
    id_user_crypto_coin INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_crypto_coin INT NOT NULL,
    invested DECIMAL(18,8),
    previous_quotation DECIMAL(18,8),
    purchase_date DATE,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_crypto_coin) REFERENCES crypto_coin(id_crypto_coin)
);


CREATE TABLE IF NOT EXISTS crypto_historic (
    id_crypto_coin INT NOT NULL,
    close_price DECIMAL(18,8),
    date_historic DATE,
    FOREIGN KEY (id_crypto_coin) REFERENCES crypto_coin(id_crypto_coin)
);

