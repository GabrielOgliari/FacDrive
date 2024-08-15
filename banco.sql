-- Table User
create table User(
    ID_User SERIAL primary key,
    CPF varchar(14),
    Registration varchar(9),
    Name varchar(50),
    Surname varchar(50),
    BirthDate date,
    DriverLicense varchar(11),
    Phone varchar(17),
    UserType BOOLEAN,
    institutionalEmail varchar(50),
    Password varchar(50),
		registration varchar(50)
);

-- Table ClassDays
create table ClassDays(
    ID_Days SERIAL primary key,
    ID_User SERIAL,
    Monday BOOLEAN,
    Tuesday BOOLEAN,
    Wednesday BOOLEAN,
    Thursday BOOLEAN,
    Friday BOOLEAN,
    Saturday BOOLEAN,
    FOREIGN KEY (ID_User) REFERENCES User(ID_User)
);

-- Table Address
create table Address(
    ID_Address SERIAL primary key,
    ID_User SERIAL,
    ZipCode varchar(9),
    Street varchar(100),
    Neighborhood varchar(50),
    City varchar(50),
    Number numeric(5),
    AdditionalInfo varchar(50),
    ReferencePoint varchar(50),
    State varchar(50),
    FOREIGN KEY (ID_User) REFERENCES User(ID_User)
);

-- Table vehicle
create table vehicle(
    ID_vehicle SERIAL primary key,
    ID_User SERIAL,
    ManufacturingDate Date,
    ManufacturingYear Date,
    ModelYear Date,
    Color varchar(45),
    Brand varchar(45),
    Model varchar(45),
    Plate varchar(7),
		City varchar(45),
		State varchar(45),
    FOREIGN KEY (ID_User) REFERENCES User(ID_User)
);

-- Table Route
create table Route(
    ID_Route SERIAL primary key,
    ID_User SERIAL,
    RouteName varchar(50),
    FOREIGN KEY (ID_User) REFERENCES User(ID_User)
);

-- Table Relationship (Match)
create table Relationship(
    ID_Relationship SERIAL primary key,
    Driver_ID SERIAL,
    Rider_ID SERIAL,
    Amount NUMERIC(10, 2),
    FOREIGN KEY (Driver_ID) REFERENCES User(ID_User),
    FOREIGN KEY (Rider_ID) REFERENCES User(ID_User)
);

-- Table Ride
create table Ride(
    ID_Ride SERIAL primary key,
    ID_Relationship SERIAL,
    DateOfRide date,
    FOREIGN KEY (ID_Relationship) REFERENCES Relationship(ID_Relationship)
);

-- Table Booking
create table Booking(
    ID_Booking SERIAL primary key,
    ID_Relationship SERIAL,
    BookingDate date DEFAULT CURRENT_DATE,
    FOREIGN KEY (ID_Relationship) REFERENCES Relationship(ID_Relationship)
);

-- Table Debt
create table Debt(
    ID_Debt SERIAL primary key,
    ID_Relationship SERIAL,
    Amount NUMERIC(10, 2),
    FOREIGN KEY (ID_Relationship) REFERENCES Relationship(ID_Relationship)
);

-- Table RoutePoints
create table RoutePoints(
    ID_RoutePoints SERIAL primary key,
    ID_Route SERIAL,
    Longitude varchar(50),
    Latitude varchar(50),
    FOREIGN KEY (ID_Route) REFERENCES Route(ID_Route)
);
