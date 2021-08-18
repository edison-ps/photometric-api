USE Test_Adhara;

CREATE TABLE  Observations(
	obsId INT PRIMARY KEY AUTO_INCREMENT,
    objectId INT NOT NULL,
    filterId INT NOT NULL,
    comparationId INT,
    jd DOUBLE(17,8) NOT NULL,
    mag FLOAT(8,6) NOT NULL,
    mErr FLOAT(7,6) NOT NULL,
    airMass FLOAT(5,4),
    FOREIGN KEY (objectId) REFERENCES Objects (objectId),
    FOREIGN KEY (comparationId) REFERENCES Comparations (comparationId),
    FOREIGN KEY (filterId) REFERENCES Filters (filterId)
) engine = InnoDB;