CREATE DATABASE appmysql;
 
use appmysql;

CREATE TABLE `clientesnopotencializables` (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  documento VARCHAR(15) NOT NULL UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  instruccion VARCHAR(255) NOT NULL,
  comite VARCHAR(255) NOT NULL,
  fechaIngreso DATE,
  fechaRegistro timestamp default current_timestamp, 
  fechaActualizacion timestamp on update current_timestamp
);
SHOW TABLES;

describe clientesnopotencializables;
