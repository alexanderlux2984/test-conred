USE dbconred;

CREATE TABLE Rol(
    ID int primary key auto_increment,
    name varchar(50)
);

CREATE TABLE Usuario(
    ID int primary key auto_increment,
    name varchar(50),
    lastname varchar (50),
    mail varchar  (50),
    pass text,
    phone varchar  (50),
    IDrol int,
    FOREIGN KEY (IDrol) REFERENCES ROL(ID)
);


INSERT INTO ROL (name) VALUES ("User1");
INSERT INTO ROL (name) VALUES ("User2");
INSERT INTO ROL (name) VALUES ("User3");
INSERT INTO ROL (name) VALUES ("User4");









