CREATE DATABASE estoque_informatica;
USE estoque_informatica;
SHOW DATABASES;
SHOW TABLES;

/* DROP DATABASE estoque_informatica; */


CREATE TABLE equipamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_patrimonio VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    data_insercao DATE NOT NULL
);

/* DROP TABLE equipamentos; */


INSERT INTO equipamentos (numero_patrimonio, modelo, categoria, data_insercao)
VALUES
('001', 'Monitor Dell P2419H', 'Monitor', '2023-01-10'),
('002', 'Desktop HP ProDesk 400 G5', 'Desktop', '2023-02-15'),
('003', 'Notebook Lenovo ThinkPad X1 Carbon', 'Notebook', '2023-03-20');
