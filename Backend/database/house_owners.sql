create table house_owners
(
    id       int auto_increment
        primary key,
    name     varchar(255) not null,
    email    varchar(255) not null,
    password varchar(255) not null,
    phone    varchar(255) not null,
    constraint email_unique
        unique (email)
)
    engine = InnoDB;

INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (1, 'John Smith', 'john.smith@example.com', 'password123', '555-555-1234');
INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (2, 'Jane Doe', 'jane.doe@example.com', 'password456', '555-555-5678');
INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (3, 'Mike Johnson', 'mike.johnson@example.com', 'password789', '555-555-9012');
INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (4, 'kaushik', 'kaushik@gmail.com', 'kaushik', '288228292');
INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (5, 'kaushik', 'vaghani@gmail.com', 'kaushik', '288228292');
INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (6, 'victor', 'abc@gmail.com', 'kaushik', '288228292');
INSERT INTO housepro.house_owners (id, name, email, password, phone) VALUES (7, 'dbs', 'dbs@gmail.com', 'dbsdbs', '08469307921');
