create database donacion_libros;

use donacion_libros;

create table usuarios (
    id int AUTO_INCREMENT PRIMARY KEY,
	nombre varchar(25) NOT NULL,
    dni int NOT NULL,
    fecha_nac date NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    contrasena varchar(100) NOT NULL,
    confirmado boolean NOT NULL DEFAULT 0
);

create table categorias (
	id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(30) NOT NULL
);

create table autores (
	id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL
);

create table libros (
	id int AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(30) NOT NULL,
    descripcion varchar(100) NOT NULL,
    autor_id int,
	categoria_id int NOT NULL,
    estado boolean NOT NULL DEFAULT 1,
    fecha_anadido date NOT NULL,
    usuario_donador_id int,
    FOREIGN KEY(autor_id) REFERENCES autores(id),
	FOREIGN KEY(categoria_id) REFERENCES categorias(id),
    FOREIGN KEY(usuario_donador_id) REFERENCES usuarios(id)
);

create table donaciones (
	id int AUTO_INCREMENT PRIMARY KEY,
    usuario_donador_id int,
    libro_donado_id int,
    usuario_recibe_id int,
    FOREIGN KEY (usuario_donador_id) REFERENCES usuarios(id),
    FOREIGN KEY (libro_donado_id) REFERENCES libros(id),
    FOREIGN KEY (usuario_recibe_id) REFERENCES usuarios(id)
);



INSERT INTO autores (nombre, apellido) VALUES ('Jorge', 'Borges');
INSERT INTO autores (nombre, apellido) VALUES ('Julio', 'Cortázar');
INSERT INTO autores (nombre, apellido) VALUES ('Adolfo', 'Bioy Casares');
INSERT INTO autores (nombre, apellido) VALUES ('Victoria', 'Ocampo');
INSERT INTO autores (nombre, apellido) VALUES ('Manuel', 'Puig');
INSERT INTO autores (nombre, apellido) VALUES ('Ricardo', 'Piglia');
INSERT INTO autores (nombre, apellido) VALUES ('Silvina', 'Ocampo');
INSERT INTO autores (nombre, apellido) VALUES ('Ernesto', 'Sábato');
INSERT INTO autores (nombre, apellido) VALUES ('Leopoldo', 'Marechal');
INSERT INTO autores (nombre, apellido) VALUES ('Alfonsina', 'Storni');


INSERT INTO categorias (nombre) VALUES ('Ficción');
INSERT INTO categorias (nombre) VALUES ('Ciencia');
INSERT INTO categorias (nombre) VALUES ('Suspenso');
INSERT INTO categorias (nombre) VALUES ('Romance');
INSERT INTO categorias (nombre) VALUES ('Autoayuda');
INSERT INTO categorias (nombre) VALUES ('Arte');
INSERT INTO categorias (nombre) VALUES ('Infantil');
INSERT INTO categorias (nombre) VALUES ('Historia');
INSERT INTO categorias (nombre) VALUES ('Geografía');
INSERT INTO categorias (nombre) VALUES ('Matemática');