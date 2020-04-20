Middleware:

- Bloque de código que se ejecuta entre la petición que hace el usuario(request) hasta que la petición llega al servidor.
https://devcode.la/tutoriales/middlewares-en-nodejs


Dependencias

- body-parser: permite convertir los datos que vienen desde el cliente (ej: un formulario) al servidor en objetos json para su interpretación.

- morgan: módulo que permite mostrar por consola las peticiones que van llegando al servidor desde el cliente

- express-myconnection: Sirve para realizar la conexión con la base de datos.


COSAS A AGREGAR TALVEZ

ByCript: Ayuda a encriptar las contraseñas 
timeago.js : convierte los timestamps o fechas de la base de datos en un formato de 2 minutos, 2 horas etc.
connect-flash : Para poder enviar mensajes entre diferentes vistas.
express-validator: para validar los datos que envia el usuario desde la aplicación cliente
--------------------------------------------------------------------------------
BASE DE DATOS

- Para este caso particular, se está trabajando con el aplicativo MySQL Workbench.
[ foto ]
- Dentro del aplicativo, contar con una conexión.
[ foto ]
- Para realizar la función de la base de datos se han creado dos scripts que se encuentran en la aplicación dentro de la carpeta database.

* Que se realiza en el archivo bd_clientesnopotencializables
1) Se crea una base de datos, la cual se llama: appmysql.
2) A continuación, con el comando ** use appmysql ** se indica que se usará esa base de datos.
3) Luego se crea la tabla "clientesnopotencializables".
4) Luego el comando ** SHOW TABLES ** muestra todas las tablas creadas.

* Que se realiza en el archivo db_usuarios.sql
1) Usa el comando ** use mysql **, ya que la base de datos ya está creada.
2) Crea la tabla "usuarios" 
3) Luego el comando ** SHOW TABLES ** muestra todas las tablas creadas.
--------------------------------------------------------------------------------
Pasos para desplegar la aplicación:

1) abrir una terminal y escribir los siguientes comandos:

- npm install [ para instalar todas las dependencias ]
- cd .\src\
- node app.js [ para ejecutar la aplicación]

Luego de esto, por medio de la consola se informará por cual puerto se está ejecutando la aplicación ( en este caso se tiene definido que el puerto sea el 3000 ).

--------------------------------------------------------------------------------
ARQUITECTURA

Esta aplicación sigue un patrón de arquitectura el cual es MVC ( modelo, vista, control).
[ foto ]



-------------------------------------------------------------------------------


