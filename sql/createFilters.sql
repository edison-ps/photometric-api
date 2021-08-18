USE Test_Adhara;

CREATE TABLE  Filters(
	filterId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(40) NOT NULL,
    wavelength FLOAT(7,2) DEFAULT 0,
    unitId INT NOT NULL,
    FOREIGN KEY (unitId) REFERENCES Units (unitId)
) engine = InnoDB;