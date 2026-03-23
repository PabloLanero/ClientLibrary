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
('978-84-663-0019-8', 'Paula', 'Autobiografía', 368, 19.00, 1, '1994-01-01'),
('978-84-339-7414-4', 'Don Quijote de la Mancha', 'Clásico', 863, 25.00, 1, '1605-01-16'),
('978-84-206-0694-1', 'Crónica de una muerte anunciada', 'Novela', 120, 14.95, 1, '1981-04-01'),
('978-84-233-5240-8', 'La sombra del viento', 'Misterio', 576, 22.00, 1, '2001-04-17'),
('978-84-663-1489-8', 'El juego del ángel', 'Misterio', 672, 23.50, 1, '2008-04-15'),
('978-84-204-6824-5', 'Conversación en La Catedral', 'Novela', 736, 24.95, 1, '1969-01-01'),
('978-84-376-0895-2', 'Pedro Páramo', 'Realismo mágico', 144, 12.50, 1, '1955-03-19'),
('978-84-204-4682-3', 'El túnel', 'Novela psicológica', 144, 13.95, 1, '1948-01-01'),
('978-84-339-0089-8', 'La Regenta', 'Realismo', 832, 26.00, 1, '1884-01-01'),
('978-84-204-8311-8', 'El otoño del patriarca', 'Novela', 271, 18.00, 1, '1975-01-01'),
('978-84-663-2890-1', 'Eva Luna', 'Novela', 288, 17.50, 1, '1987-01-01'),
('978-84-204-2959-8', 'Bestiario', 'Cuento', 160, 14.00, 1, '1951-01-01'),
('978-84-376-3156-1', 'Los detectives salvajes', 'Novela', 609, 23.00, 1, '1998-01-01'),
('978-84-339-6841-9', 'Fortunata y Jacinta', 'Realismo', 1088, 28.50, 1, '1887-01-01'),
('978-84-204-6825-2', 'La fiesta del Chivo', 'Novela histórica', 518, 21.95, 1, '2000-03-01'),
('978-84-663-0020-4', 'De amor y de sombra', 'Romance', 272, 16.95, 1, '1984-01-01'),
('978-84-376-0896-9', 'El llano en llamas', 'Cuento', 176, 13.50, 1, '1953-01-01'),
('978-84-204-2960-4', 'Historia universal de la infamia', 'Cuento', 128, 12.95, 1, '1935-01-01'),
('978-84-339-7415-1', 'La Celestina', 'Clásico', 304, 15.50, 1, '1499-01-01'),
('978-84-233-5241-5', 'El prisionero del cielo', 'Misterio', 400, 20.50, 1, '2011-11-17'),
('978-84-204-0291-1', 'Los cachorros', 'Novela corta', 96, 11.50, 1, '1967-01-01'),
('978-84-450-0001-3', 'El Principito', 'Infantil', 96, 9.95, 1, '1943-04-06'),
('978-84-204-8313-2', 'Noticia de un secuestro', 'Periodismo', 304, 18.95, 1, '1996-05-01'),
('978-84-339-1234-5', 'Lazarillo de Tormes', 'Clásico', 128, 10.50, 1, '1554-01-01'),
('978-84-663-3456-7', 'Inés del alma mía', 'Novela histórica', 400, 20.00, 1, '2006-10-01'),
('978-84-204-7890-1', 'Pantaleón y las visitadoras', 'Novela', 320, 17.95, 1, '1973-01-01'),
('978-84-376-5678-9', 'Aura', 'Novela corta', 80, 10.95, 1, '1962-01-01'),
('978-84-233-6789-0', 'Marina', 'Misterio', 304, 16.50, 1, '1999-01-01'),
('978-84-204-9012-3', 'La tía Julia y el escribidor', 'Novela', 448, 19.50, 1, '1977-01-01'),
('978-84-663-4567-8', 'El plan infinito', 'Novela', 352, 18.00, 1, '1991-01-01'),
('978-84-376-6789-0', 'Como agua para chocolate', 'Romance', 256, 16.00, 1, '1989-01-01'),
('978-84-339-2345-6', 'Romancero gitano', 'Poesía', 144, 12.00, 1, '1928-07-01'),
('978-84-204-1234-5', 'Final del juego', 'Cuento', 192, 14.50, 1, '1956-01-01'),
('978-84-233-7890-1', 'El laberinto de los espíritus', 'Misterio', 944, 26.95, 1, '2016-11-17'),
('978-84-663-5678-9', 'Hija de la fortuna', 'Novela histórica', 416, 19.95, 1, '1999-01-01'),
('978-84-376-7890-1', 'La muerte de Artemio Cruz', 'Novela', 320, 17.00, 1, '1962-01-01'),
('978-84-204-2345-6', 'Los ríos profundos', 'Novela', 256, 16.50, 1, '1958-01-01'),
('978-84-339-3456-7', 'Platero y yo', 'Prosa poética', 176, 13.00, 1, '1914-12-01'),
('978-84-663-6789-0', 'Retrato en sepia', 'Novela', 368, 18.50, 1, '2000-10-01'),
('978-84-376-8901-2', 'Terra Nostra', 'Novela', 784, 25.50, 1, '1975-01-01'),
('978-84-233-8901-2', 'Las aventuras de Tom Sawyer', 'Aventura', 288, 15.00, 1, '1876-01-01');


INSERT INTO Usuario (Id, Nombre, Apellido, Email, Passwor, Rol,FechaRegistro, EstaActivo) VALUES
(1, 'Admin', 'sudo', 'admin@email.com', 'Cambiame2025', 'admin','2023-01-15', 1),
(2, 'Carlos', 'Martínez', 'carlos.martinez@email.com', 'Pass12345', 'user','2023-02-10', 1),
(3, 'María', 'López', 'maria.lopez@email.com', 'Pass12345', 'user','2023-02-15', 1),
(4, 'Juan', 'Pérez', 'juan.perez@email.com', 'Pass12345', 'user','2023-03-01', 1),
(5, 'Ana', 'García', 'ana.garcia@email.com', 'Pass12345', 'user','2023-03-05', 1),
(6, 'Luis', 'Rodríguez', 'luis.rodriguez@email.com', 'Pass12345', 'user','2023-03-10', 1);


INSERT INTO Prestamo (Id, LibroISBN, UsuarioId, FechaPrestamo, FechaDevolucionPrevista, FechaDevolucionReal, EstadoPrestamo, Multa) VALUES
(1, '978-84-204-8312-5', 1, '2023-03-01', '2023-03-15', NULL, 'Activo', NULL),
(2, '978-84-01-45001-2', 2, '2023-03-02', '2023-03-16', '2023-03-14', 'Devuelto', 0.00);