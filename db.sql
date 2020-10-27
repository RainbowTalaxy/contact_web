CREATE DATABASE IF NOT EXISTS contact CHARACTER SET utf8;
USE contact;

CREATE TABLE IF NOT EXISTS information (
    i_id INT(3) PRIMARY KEY AUTO_INCREMENT,
    i_name NCHAR(10) not NULL,
    i_addr TEXT,
    i_tele CHAR(11)
);