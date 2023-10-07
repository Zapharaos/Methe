CREATE DATABASE IF NOT EXISTS metheDB;
USE metheDB;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  userId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  userLogin varchar(100) NOT NULL,
  userPassword varchar(100) DEFAULT NULL,
  PRIMARY KEY (userId),
  CONSTRAINT UQ_users_login UNIQUE (userLogin)
) Auto_INCREMENT = 1;
