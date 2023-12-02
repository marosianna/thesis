-- Creating the main database of the application
CREATE DATABASE med-db;
CREATE USER admin WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE med-db TO admin;
