//Descripción: Esta clase conecta tanto los métodos que vienen del controlador con los métodos que vienen de la vista.

const express = require('express');
const router = express.Router();


const clientesController = require ('../controllers/clientesController');

//Métodos para los clientes

//para cada método http que viene del router se realiza lo siguiente:
// Cuando se llama a cada método se tienen dos parámetros:
//1) La ruta específica. 
//2) La función que va a realizar de acuerdo a esa ruta que fue definida en el ( frontend ). 
//Esto quiere decir que para cada ruta, hay una función definida. 
router.get('/', clientesController.listarClientes);

router.post('/add', clientesController.guardarClientes);

router.get('/delete/:id', clientesController.eliminarClientes);

//En este caso tenemos rutas similares para el "update" pero las funciones que realizan son diferentes.
router.get('/update/:id', clientesController.mostrarVistaClientes);

router.post('/update/:id', clientesController.actualizarClientes);

router.get('/buscar', clientesController.mostrarVistaBuscarClientes);

//En este caso, este método es el que va a la base de datos y hace la búsqueda del registro con el documento.
router.post('/buscarClientex', clientesController.buscarCliente);

//Este método sirve a la hora de comprobar la ruta una vez haya cerrado sesión ( una petición get). 
router.get('/buscarClientex', clientesController.buscarCliente);

//router.get('/mostrarClienteBuscado', clientesController.mostrarClienteBuscado);


//-----------------------------------------------------------------------------------------------------------
// Métodos para los usuarios

router.get('/registrarVista', clientesController.mostrarVistaRegistrar);

router.post('/registrarUsuario', clientesController.guardarUsuarios);

router.get('/login', clientesController.mostrarVistaLogin);

router.post('/inicioDeSesion', clientesController.iniciarSesion);

router.get('/cerrarSesion', clientesController.cerrarSesion);



module.exports = router;