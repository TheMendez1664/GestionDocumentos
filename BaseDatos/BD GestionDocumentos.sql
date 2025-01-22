-- Crear la base de datos
CREATE DATABASE GestionDocumentos;

-- Usar la base de datos
USE GestionDocumentos;

-- CREACIÓN DE LAS TABLAS NORMALIZADAS

-- Tabla para almacenar los tipos de documentos
CREATE TABLE TipoDocumento (
    idTipoDocumento INT AUTO_INCREMENT PRIMARY KEY,
    nombreTipo VARCHAR(50) NOT NULL
);

-- Tabla para almacenar las áreas
CREATE TABLE Area (
    idArea INT AUTO_INCREMENT PRIMARY KEY,
    iniciales VARCHAR(10) NOT NULL,
    nombreArea VARCHAR(100) NOT NULL
);

-- Tabla para almacenar los remitentes
CREATE TABLE Remitente (
    idRemitente INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(10) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    idArea INT,
    FOREIGN KEY (idArea) REFERENCES Area(idArea)
);

-- Tabla para almacenar los documentos
CREATE TABLE Documento (
    idDocumento INT AUTO_INCREMENT PRIMARY KEY,
    idRemitente INT NOT NULL,
    fechaElaboracion DATE NOT NULL,
    fechaRecepcion DATE NOT NULL,
    idTipoDocumento INT NOT NULL,
    sumilla TEXT NOT NULL,
    idAreaDestino INT NOT NULL,
    FOREIGN KEY (idRemitente) REFERENCES Remitente(idRemitente),
    FOREIGN KEY (idTipoDocumento) REFERENCES TipoDocumento(idTipoDocumento),
    FOREIGN KEY (idAreaDestino) REFERENCES Area(idArea)
);

-- Insertar datos en la tabla TipoDocumento
INSERT INTO TipoDocumento (nombreTipo) VALUES
('Oficio'),
('Memorando'),
('Carta'),
('Informe');

-- Insertar datos en la tabla Area
INSERT INTO Area (iniciales, nombreArea) VALUES
('RRHH', 'Recursos Humanos'),
('LOG', 'Logística'),
('ADM', 'Administración'),
('TEC', 'Tecnología');

-- Insertar datos en la tabla Remitente
INSERT INTO Remitente (dni, nombres, idArea) VALUES
('12345678', 'Juan Pérez Pérez', 1), -- Recursos Humanos
('87654321', 'María López García', 2), -- Logística
('56781234', 'Carlos Gómez Díaz', 3), -- Administración
('34567812', 'Ana Rodríguez Torres', 4); -- Tecnología

-- Insertar datos en la tabla Documento
INSERT INTO Documento (idRemitente, fechaElaboracion, fechaRecepcion, idTipoDocumento, sumilla, idAreaDestino) VALUES
(1, '2024-01-12', '2024-01-13', 1, 'Solicitud de permiso', 2), -- Oficio a Logística
(2, '2024-01-15', '2024-01-15', 2, 'Requerimiento de materiales', 3), -- Memorando a Administración
(3, '2024-01-20', '2024-01-21', 3, 'Carta de recomendación', 4), -- Carta a Tecnología
(4, '2024-01-25', '2024-01-26', 4, 'Informe de incidentes', 1); -- Informe a Recursos Humanos

