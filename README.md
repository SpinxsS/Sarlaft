Tecnologías usadas en este proyecto:
-NodeJS

-Express:Es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles.

-EJS:Con EJS (como otras plantillas Express), se puede ejecutar código del servidor y acceder a las variables de él desde el HTML.
EJS usa " <% " como etiqueta de inicio y " %> " como etiqueta final, las variables pasadas como parámetros de render pueden accederse usando <%=var_name%>

Paradigma de programación:

https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html
-Programación orientada a eventos

En este caso no se utiliza la POO(programación orientada a objetos) sino la rogramación orientado por eventos.

El lado del servidor realmente no es tan diferente del lado del cliente. Es verdad, no se están presionando botones, y no se está ingresando texto en campos, pero a un nivel superior,
están sucediendo eventos. Se realiza una conexión — ¡evento! Se reciben datos a través de la conexión — ¡evento! Se dejan de recibir datos por
la conexión — ¡evento!

Algunos conceptos para tener en cuenta:

Middleware:

- Bloque de código que se ejecuta desde la petición que hace el usuario(request) hasta que la petición llega al servidor.
https://devcode.la/tutoriales/middlewares-en-nodejs

 
Dependencias

- body-parser: permite convertir los datos que vienen desde el cliente (ej: un formulario) al servidor en objetos json para su interpretación.

- morgan: módulo que permite mostrar por consola las peticiones que van llegando al servidor desde el cliente

- express-myconnection: Sirve para realizar la conexión con la base de datos.

-ByCript: Libreria para a encriptar las contraseñas .

-timeago.js : convierte los timestamps o fechas de la base de datos en un formato de 2 minutos, 2 horas etc.

-connect-flash : Para poder enviar mensajes entre diferentes vistas.

-express-validator: para validar los datos que envia el usuario desde la aplicación cliente.


Estructura de la aplicación a nivel general

-proyecto
 -database
  -src
  -public
  -routes
  -views
 -app 
 -database.js
 -keys.js

--------------------------------------------------------------------------------
BASE DE DATOS

- Para este caso particular, se está trabajando con el aplicativo MySQL Workbench.

- Dentro del aplicativo, contar con una conexión [ configuración de la base de datos ] .

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


