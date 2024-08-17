-- Table User
create table users(
    idUser SERIAL primary key,
    cpf varchar(14),
    registration varchar(9),
    name varchar(50),
    surname varchar(50),
    birthDate date,
    driverLicense varchar(11),
    phone varchar(17),
    isDriver BOOLEAN,
    institutionalEmail varchar(50),
    password varchar(50),
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
    zipCode varchar(9),
    street varchar(100),
    neighborhood varchar(50),
    city varchar(50),
    number numeric(5),
    additionalInfo varchar(50),
    referencePoint varchar(50),
    state varchar(50),
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

-- Table vehicle
create table vehicle(
    idVehicle SERIAL primary key,
    idUser SERIAL,
    manufacturingYear varchar(4),
    modelYear varchar(4),
    color varchar(45),
    brand varchar(45),
    model varchar(45),
    plate varchar(7),
	city varchar(45),
	state varchar(45),
    FOREIGN KEY (idUser) REFERENCES users(idUser)
);

-- Table Route
create table route(
    idRoute SERIAL primary key,
    idUser SERIAL,
    routeName varchar(50),
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
    dateOfRide date,
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