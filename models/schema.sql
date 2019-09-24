DROP DATABASE IF EXISTS pomodoroTask_db;

CREATE  DATABASE pomodoroTask_db;
USE pomodoroTask_db;


CREATE TABLE deck (
    deckId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deckName VARCHAR(100) NOT NULL
    );
    
CREATE TABLE card (
	cardID  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	deckId INT, FOREIGN KEY (deckId) REFERENCES deck(deckId),
    cardtitle VARCHAR(40) NOT NULL,
    cardDescription VARCHAR(255) NOT NULL
);


