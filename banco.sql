-- Table User
create table users(
    idUser SERIAL primary key,
    cpf varchar(14) not null,
    registration varchar(9) not null,
    name varchar(50) not null,
    surname varchar(50)  not null,
    birthDate date not null,
    driverLicense varchar(11) ,
    phone varchar(17) not null,
    isDriver BOOLEAN not null,
    institutionalEmail varchar(50) not null,
    password text not null,
    userImage text,
    gender char
);

-- Table ClassDays
create table classDays(
    idDays SERIAL primary key,
    idUser SERIAL,
    monday BOOLEAN,
    tuesday BOOLEAN,
    wednesday BOOLEAN,
    thursday BOOLEAN,
    friday BOOLEAN,
    saturday BOOLEAN,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

-- Table Address
create table address(
    idAddress SERIAL primary key,
    idUser SERIAL,
    zipCode varchar(9) not null,
    street varchar(100) not null,
    neighborhood varchar(50) not null,
    city varchar(50) not null,
    number numeric(5) not null,
    additionalInfo varchar(50),
    referencePoint varchar(50),
    state varchar(50) not null,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

-- Table vehicle
create table vehicle(
    idVehicle SERIAL primary key,
    idUser SERIAL,
    manufacturingYear varchar(4) not null,
    modelYear varchar(4) not null,
    color varchar(45) not null,
    brand varchar(45) not null,
    model varchar(45) not null,
    plate varchar(7) not null,
	city varchar(45) not null,
	state varchar(45) not null,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

-- Table Route
create table route(
    idRoute SERIAL primary key,
    idUser SERIAL,
    routeName varchar(50) not null,
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

-- Table Relationship (Match)
create table relationship(
    idRelationship SERIAL primary key,
    driverId SERIAL,
    riderId SERIAL,
    amount NUMERIC(10, 2),
    FOREIGN KEY (driverId) REFERENCES users(idUser),
    FOREIGN KEY (riderId) REFERENCES users(idUser)
);

-- Table Ride
create table ride(
    idRide SERIAL primary key,
    idRelationship SERIAL,
    dateOfRide date DEFAULT CURRENT_DATE,
    FOREIGN KEY (idRelationship) REFERENCES relationship(idRelationship)
);

-- Table Booking
create table booking(
    idBooking SERIAL primary key,
    idRelationship SERIAL,
    bookingDate date DEFAULT CURRENT_DATE,
    FOREIGN KEY (idRelationship) REFERENCES relationship(idRelationship)
);

-- Table Debt
create table debt(
    idDebt SERIAL primary key,
    idRelationship SERIAL,
    amount NUMERIC(10, 2),
    FOREIGN KEY (idRelationship) REFERENCES Relationship(idRelationship)
);

-- Table RoutePoints
create table routePoints(
    idRoutePoints SERIAL primary key,
    idRoute SERIAL,
    longitude varchar(50),
    latitude varchar(50),
    FOREIGN KEY (idRoute) REFERENCES route(idRoute)
);