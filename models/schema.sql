DROP DATABASE IF EXISTS pomodoroTask_db;

CREATE  DATABASE pomodoroTask_db;
USE pomodoroTask_db;

CREATE TABLE user (
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE deck (
    deckId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT, FOREIGN KEY (userId) REFERENCES user(userId),
    deckName VARCHAR(100) NOT NULL
    );
    
    
CREATE TABLE card (
	cardID  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	deckId INT, FOREIGN KEY (deckId) REFERENCES deck(deckId),
    title VARCHAR(40) NOT NULL,
    taskDescription VARCHAR(255) NOT NULL
);



