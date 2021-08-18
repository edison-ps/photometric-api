USE Test_Adhara;

CREATE TABLE  Comparations(
	comparationId INT PRIMARY KEY AUTO_INCREMENT,
    comparation VARCHAR(30) NOT NULL UNIQUE,
    ra VARCHAR(15) NOT NULL,
    `dec` VARCHAR(15) NOT NULL,
    mag float(8,6) DEFAULT 0,
    chart VARCHAR(15)
) engine = InnoDB;