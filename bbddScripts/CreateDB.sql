CREATE DATABASE IF NOT EXISTS BiblioDB;
USE BiblioDB;

CREATE TABLE Autor (
    Id INT PRIMARY KEY NOT NULL ,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100),
    Nacionalidad VARCHAR(50),
    FechaNacimiento DATE,
    EstaVivo TINYINT(1),
    Biografia TEXT
);

CREATE TABLE Editorial (
    Id INT PRIMARY KEY NOT NULL ,
    Nombre VARCHAR(100),
    Direccion VARCHAR(200),
    Telefono VARCHAR(20),
    Email VARCHAR(100),
    FechaFundacion DATE,
    SitioWeb VARCHAR(100)
);

CREATE TABLE Libro (
    ISBN VARCHAR(20) PRIMARY KEY NOT NULL,
    Titulo VARCHAR(200),
    Genero VARCHAR(50),
    NumeroPaginas INT,
    Precio DECIMAL(10,2),
    Disponible TINYINT(1),
    FechaPublicacion DATE
);

CREATE TABLE Usuario (
    Id INT PRIMARY KEY NOT NULL ,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Passwor VARCHAR(100),
    Rol VARCHAR(64),
    FechaRegistro DATE,
    EstaActivo TINYINT(1)
);
ALTER TABLE BiblioDB.Usuario MODIFY COLUMN Id int auto_increment NOT NULL;

CREATE TABLE Prestamo (
    Id INT PRIMARY KEY NOT NULL ,
    LibroISBN VARCHAR(20) NOT NULL,
    UsuarioId INT NOT NULL,
    FechaPrestamo DATE,
    FechaDevolucionPrevista DATE,
    FechaDevolucionReal DATE,
    EstadoPrestamo VARCHAR(50),
    Multa DECIMAL(10,2)
);
CREATE TABLE `Resenas` (
	`Id` INT ,
	`Resena` VARCHAR(255) ,
	`ISBNLibro` VARCHAR(255) ,
	`IdUsuario` INT,
	`Valoracion` INT,
	`FechaResena` DATE
);


INSERT INTO Editorial (Id, Nombre, Direccion, Telefono, Email, FechaFundacion, SitioWeb) VALUES
(1, 'Editorial Alfaguara', 'Calle Falsa 123, Madrid, España', '+34 91 123 45 67', 'contacto@alfaguara.com', '1964-05-15', 'www.alfaguara.com'),
(2, 'Penguin Random House', 'Avenida Real 456, Barcelona, España', '+34 93 987 65 43', 'info@penguinrandomhouse.com', '2013-07-01', 'www.penguinrandomhouse.com');


INSERT INTO Autor (Id, Nombre, Apellido, Nacionalidad, FechaNacimiento, EstaVivo, Biografia) VALUES
(1, 'Gabriel', 'García Márquez', 'Colombiana', '1927-03-06', 0, 'Escritor y periodista colombiano, premio Nobel de Literatura en 1982.'),
(2, 'Isabel', 'Allende', 'Chilena', '1942-08-02', 1, 'Escritora chilena, conocida por novelas como "La casa de los espíritus".'),
(3, 'Jorge Luis', 'Borges', 'Argentina', '1899-08-24', 0, 'Escritor argentino, maestro del cuento corto y la literatura fantástica.'),
(4, 'Mario', 'Vargas Llosa', 'Peruana', '1936-03-28', 1, 'Escritor peruano, premio Nobel de Literatura en 2010.'),
(5, 'Julio', 'Cortázar', 'Argentina', '1914-08-26', 0, 'Escritor argentino, conocido por sus cuentos y novelas experimentales.');


INSERT INTO Libro (ISBN, Titulo, Genero, NumeroPaginas, Precio, Disponible, FechaPublicacion) VALUES
('978-84-204-8312-5', 'Cien años de soledad', 'Realismo mágico', 471, 19.95, 1, '1967-05-30'),
('978-84-01-45001-2', 'La casa de los espíritus', 'Novela', 499, 18.50, 1, '1982-01-01'),
('978-84-376-0494-7', 'Ficciones', 'Cuento', 174, 15.90, 1, '1944-01-01'),
('978-84-204-2958-1', 'El Aleph', 'Cuento', 203, 16.50, 1, '1949-01-01'),
('978-84-204-0290-4', 'La ciudad y los perros', 'Novela', 408, 21.00, 1, '1963-01-01'),
('978-84-204-2957-4', 'Rayuela', 'Novela experimental', 600, 22.95, 1, '1963-06-28'),
('978-84-376-2471-6', 'El amor en los tiempos del cólera', 'Romance', 464, 20.50, 1, '1985-01-01'),
('978-84-663-0019-8', 'Paula', 'Autobiografía', 368, 19.00, 1, '1994-01-01');


INSERT INTO Usuario (Id, Nombre, Apellido, Email, Passwor, Rol,FechaRegistro, EstaActivo) VALUES
(1, 'Admin', 'sudo', 'admin@email.com', 'Cambiame2025', 'admin','2023-01-15', 1),
(2, 'Carlos', 'Martínez', 'carlos.martinez@email.com', 'Pass123', 'user','2023-02-10', 1),
(3, 'María', 'López', 'maria.lopez@email.com', 'Pass123', 'user','2023-02-15', 1),
(4, 'Juan', 'Pérez', 'juan.perez@email.com', 'Pass123', 'user','2023-03-01', 1),
(5, 'Ana', 'García', 'ana.garcia@email.com', 'Pass123', 'user','2023-03-05', 1),
(6, 'Luis', 'Rodríguez', 'luis.rodriguez@email.com', 'Pass123', 'user','2023-03-10', 1);


INSERT INTO Prestamo (Id, LibroISBN, UsuarioId, FechaPrestamo, FechaDevolucionPrevista, FechaDevolucionReal, EstadoPrestamo, Multa) VALUES
(1, '978-84-204-8312-5', 1, '2023-03-01', '2023-03-15', NULL, 'Activo', NULL),
(2, '978-84-01-45001-2', 2, '2023-03-02', '2023-03-16', '2023-03-14', 'Devuelto', 0.00);