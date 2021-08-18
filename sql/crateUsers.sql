USE Test_Adhara;

CREATE TABLE  Users(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(20) NOT NULL,
    user VARCHAR(10) NOT NULL
) engine = InnoDB;