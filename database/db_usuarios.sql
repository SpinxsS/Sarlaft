use appmysql;

CREATE TABLE `usuarios` (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(255) NOT NULL UNIQUE,
  nombre VARCHAR(255) NOT NULL ,
  contrasena VARCHAR(255) NOT NULL 
);


SHOW TABLES;

describe usuarios;