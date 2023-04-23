create table property_request
(
    id                  int auto_increment
        primary key,
    property_id         int          not null,
    name                varchar(255) not null,
    email               varchar(255) not null,
    phone               varchar(255) not null,
    description_message varchar(255) not null,
    constraint property_request_ibfk_1
        foreign key (property_id) references properties (id)
)
    engine = InnoDB;

create index property_id
    on property_request (property_id);

