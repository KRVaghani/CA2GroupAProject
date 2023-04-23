create table properties
(
    id          int auto_increment
        primary key,
    owner_id    int            not null,
    address     varchar(255)   not null,
    city        varchar(255)   not null,
    bedrooms    int            not null,
    description varchar(255)   not null,
    price       decimal(10, 2) not null,
    Url         varchar(255)   not null,
    Type        varchar(255)   not null,
    constraint properties_ibfk_1
        foreign key (owner_id) references house_owners (id)
)
    engine = InnoDB;

create index owner_id
    on properties (owner_id);

INSERT INTO housepro.properties (id, owner_id, address, city, bedrooms, description, price, Url, Type) VALUES (1, 1, '123 Main Street', 'dublin', 3, 'Beautiful family home', 250000.00, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', 'Studio House');
INSERT INTO housepro.properties (id, owner_id, address, city, bedrooms, description, price, Url, Type) VALUES (2, 2, '456 Oak Street', 'dublin', 2, 'Cozy apartment', 150000.00, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', 'Apartment');
INSERT INTO housepro.properties (id, owner_id, address, city, bedrooms, description, price, Url, Type) VALUES (3, 7, 'd03n2n4', '', 4, 'Spacious luxury home', 500000.00, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60', '3BHK House');
INSERT INTO housepro.properties (id, owner_id, address, city, bedrooms, description, price, Url, Type) VALUES (4, 7, 'fairview', 'dublin', 2, 'd03n2n5', 50000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUIc6UqG7tXHvWNhtOloRThepRSfhr9cD0w&usqp=CAU', 'House');
INSERT INTO housepro.properties (id, owner_id, address, city, bedrooms, description, price, Url, Type) VALUES (5, 4, 'sdkjskjd', 'cork', 2, 'jndfdjnfnjd', 39493.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUIc6UqG7tXHvWNhtOloRThepRSfhr9cD0w&usqp=CAU', 'Rooms');
