CREATE USER 'fafadmin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `findandfly`.* TO 'fafadmin'@'localhost';
FLUSH PRIVILEGES;
