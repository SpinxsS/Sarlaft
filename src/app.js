//Descripción: Esta clase realiza las configuraciones necesarias para la funcionalidad de la aplicación.

//Aquí se importan los módulos con los cuales va a trabajar la aplicación.
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const app = express();

//importando Rutas 
const clientesRoutes = require('./routes/rutasApp');

//Especificaciones
app.set('port', process.env.PORT || 3000);
app.set('view engine ', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
  //Configuración para las sesiones y el uso de cookies en nodejs y express
  app.use(cookieParser());
  app.use(session ({
    secret:'123456',
    resave: false,
    saveUninitialized: false,
    store : new MySQLStore(database)
  }));

  
//middlewares, se ejecutan antes de que vengan las peticiones del usuario
app.use(morgan('dev'));
app.use(flash());

//variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');

  next();
});



//esta linea permite que desde el modulo express, se puedan entender todos los datos que vienen desde el formulario
app.use(express.urlencoded({extended: false}));

//Especificación de las rutas.
app.use('/', clientesRoutes);

//Ruta para los archivos estáticos ( ej: Imágenes, estilos etc.)
app.use(express.static(path.join(__dirname, '/public')));

// Aquí la aplicación inicia un servidor y escucha las conexiones a través del puerto establecido,
// en este caso el 3000.
app.listen(app.get('port'), () => {
    console.log("Servidor corriendo en puerto 3000");
});