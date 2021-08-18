USE Test_Adhara;

CREATE TABLE  Units(
	unitId INT PRIMARY KEY AUTO_INCREMENT,
    abbreviation VARCHAR(10) NOT NULL,
    description VARCHAR(20) NOT NULL,
    value FLOAT(11,10) NOT NULL
) engine = InnoDB;