CREATE DATABASE IF NOT EXISTS metheDB;
USE metheDB;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  userId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email varchar(250) NOT NULL,
  password varchar(250) NOT NULL,
  userName varchar(100) NOT NULL,
  PRIMARY KEY (userId),
  CONSTRAINT UQ_users_login UNIQUE (userName)
) Auto_INCREMENT = 1;
