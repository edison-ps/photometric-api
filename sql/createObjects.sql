USE Test_Adhara;

CREATE TABLE  Objects(
	objectId INT PRIMARY KEY AUTO_INCREMENT,
    object VARCHAR(30) NOT NULL UNIQUE,
    ra VARCHAR(15) NOT NULL,
    `dec` VARCHAR(15) NOT NULL,
    maxMag FLOAT(8,6),
    minMag FLOAT(8,6),
    period FLOAT(6,2),
    type VARCHAR(20)
) engine = InnoDB;