//Descripción: Esta clase es la conexión que se realiza entre el controlador y la base de datos ( backend ). 
//Aclarar que no hay ninguna clase modelo que represente como clases en la aplicación las tablas de la base de datos 
//( no hay "modelo" ). 
//De aquí se extrae la información de la base de datos y se envía hacia la vista ( frontend )  y viceversa. 
const pool = require('../database');


 
const controller =  {};

//Método get que muestra la lista de clientes que hay en la base de datos
//Tipo de consulta: GET
//Tabla de mysql: clientesnopotencializables
controller.listarClientes = (req, res) => {
    if( req.session.loggedin){
        
            pool.query('SELECT id, documento, nombre, instruccion, comite, DATE_FORMAT(fechaIngreso, "%d-%m-%Y") AS fechaIngreso FROM clientesnopotencializables', (err, clientes) => {
                if (err) {
                res.json(err);
                }
                res.render('clientes.ejs', {
                data: clientes
                });
            });
      
    }
    else{
        res.redirect('/login');
    };
};

//Descripción: Método get que renderiza la vista la cual contiene el formulario que registra usuarios.
//Tabla de mysql: usuarios
controller.mostrarVistaRegistrar = (req, res) => {
    res.render('registrar.ejs');
};

//Descripción: Método get que renderiza la vista la cual contiene el formulario que inicia sesión en la aplicación.
//Tabla de mysql: usuarios
controller.mostrarVistaLogin = (req, res) => {
    res.render('login.ejs')
};


controller.mostrarVistaAgregar = (req, res) => {
    res.render('agregarCliente.ejs');
};

//Descripción: Método post que registra los usuarios en la base de datos ( guarda los usuarios ).
//Tipo de consulta: POST
//Tabla de mysql: usuarios
controller.guardarUsuarios = async (req, res) => {
    const data = req.body;
    const codigoQueVieneDelFormulario = req.body.codigo;
    const nombreQueVieneDelFormulario = req.body.nombre;
    const passwordQueVieneDelFormulario = req.body.contrasena;
    //Condicional: si el nombre y la password que se escriben en el formulario de login no están vacíos, entra al condicional.
    //De lo contrario, redirige a la vista de registrar
    if ( codigoQueVieneDelFormulario && nombreQueVieneDelFormulario && passwordQueVieneDelFormulario ){
            await pool.query('INSERT IGNORE INTO usuarios set ?', [data], (err, usuarios) => {
                if (err) {
                    throw err;
                }
                req.flash('success', 'Se ha registrado un usuario correctamente');
                res.redirect('/login');
            });
        
    }
    else{
        res.redirect('/registrarVista');
    }
};

//Descripción: Método que verifica si las credenciales de usuario y contraseña que se ingresan en el formulario de 
//login se encuentran en la base de datos, sí es así inicia sesión ( utilizando un método post que envía los datos
// desde la vista) , sino se queda en la página de login hasta que se ingrese un usuario previamente registrado.
//Tipo de consulta: POST 
//Tabla de mysql: usuarios
controller.iniciarSesion = async (req, res) => {
    const codigoQueVieneDelFormulario = req.body.codigo;
    const passwordQueVieneDelFormulario = req.body.contrasena;
    //Condicional: si el nombre y la password que se escriben en el formulario de login no están vacíos, entra al condicional.
    //De lo contrario, redirige al login
    if ( codigoQueVieneDelFormulario  && passwordQueVieneDelFormulario ){
        //A continuación realiza la conexión con la base de datos a través de una consulta, en la que se pasa por parámetro
        //el nombre y la password escritos en el formulario, sí ambos valores se encuentran en la base de datos entonces inicia sesión.
            await pool.query('SELECT * FROM usuarios WHERE codigo = ? AND contrasena = ?', [codigoQueVieneDelFormulario, passwordQueVieneDelFormulario], function(err, usuarios) {
                //la query puede arrojar dos resultados: 
                //err: indica que sucedio un error.
                //result: obtiene la información de la base de datos
                if( err ){
                    throw err;
                }
                else{
                    var resultado = usuarios;
                    if(resultado.length > 0 ){
                        req.session.loggedin = true;
                        req.session.codigo = codigoQueVieneDelFormulario;
                        req.flash('success', 'Se ha iniciado sesión correctamente');
                        res.redirect('/');
                    }
                    else{
                        //req.flash('success', 'El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.');
                        res.redirect('/login');
                    }
                }
            });
        
    }
    else{
        res.redirect('/login');
    }
};

//Descripción: Método que destruye la sesión una vez que se oprime el botón de cerrar sesión y redirige a la vista de login.
controller.cerrarSesion = (req, res ) =>{
    req.session.destroy();
    res.redirect('/login');
};

//Descripción: Método post que registra los clientes en la base de datos ( guarda los clientes ).
//Tipo de consulta: POST
//Tabla de mysql: clientesnopotencializados
controller.guardarClientes = async (req, res) => {
    const data = req.body;
    const nombreQueVieneDelFormulario= req.body.nombre;
    const documentoQueVieneDelFormulario= req.body.documento;
    const instruccionQueVieneDelFormulario= req.body.instruccion;
    const comiteQueVieneDelFormulario= req.body.comite;
    const fechaIngresoQueVieneDelFormulario= req.body.fechaIngreso;
    if (nombreQueVieneDelFormulario && documentoQueVieneDelFormulario && instruccionQueVieneDelFormulario && 
        comiteQueVieneDelFormulario &&  fechaIngresoQueVieneDelFormulario ){
                await pool.query('INSERT IGNORE INTO clientesnopotencializables set ?', [data], (err, clientes) => {
                    if (err) {
                        throw err;
                    }
                    req.flash('success', 'Se ha registrado un usuario correctamente');
            res.redirect('/');
            });
       
    }
    else{
        res.redirect('/');
    }
};
//Descripción: Método get que recupera los clientes de la base de datos por el parámetro id.
//Tipo de consulta: GET
//Tabla de mysql: clientesnopotencializados
controller.mostrarVistaClientes = async (req, res) =>{
    const id = req.params.id;
    //Condicional: sí el usurario está logueado, entra al condicional. De lo contrario, se redirige al login.
    if( req.session.loggedin){
           await pool.query('SELECT * FROM clientesnopotencializables WHERE id = ?', [id], (err, clientes) =>{
                res.render('editarClientes.ejs', {
                    data: clientes[0]
                });
            });
        
    }
    else{
        res.redirect('/login');
    }
};
//Descripción: Método post que actualiza los clientes de la base de datos a través del parámetro id.
//Tipo de consulta: POST
//Tabla de mysql: clientesnopotencializados
controller.actualizarClientes = async (req, res) => {
    const id = req.params.id;
    const newCliente = req.body;
    await pool.query('UPDATE clientesnopotencializables set ? WHERE id = ?', [newCliente, id], (err, clientes) =>{
        req.flash('success', 'El cliente se ha editado correctamente');
        res.redirect('/');
        });
    
};

//Descripción: Método que elimina los clientes de la base de datos por el parámetro id.
//Tabla de mysql: clientesnopotencializados
controller.eliminarClientes = async (req, res) => {
    const id = req.params.id;
        await pool.query('DELETE FROM clientesnopotencializables WHERE id= ?', [id], (err, clientes) =>{
            req.flash('success', 'Cliente eliminado correctamente');
        res.redirect('/');
        });
    
};

controller.mostrarVistaBuscarClientes = (req, res) => {
    if (req.session.loggedin) {
        res.render('buscarClientes.ejs');
    }
    else {
        res.redirect('/login');
    }
};

//controller.mostrarClienteBuscado = (req, res) => {
 //   if( req.session.loggedin){
//         res.render('vistaConsultaClientes.ejs')
//    }
//    else{
 //       res.redirect('/login');
  //  }
//};


controller.buscarCliente =  async (req, res) => {
    const documento = req.body.documento;
    if( req.session.loggedin){
           await pool.query('SELECT id, documento, nombre, instruccion, comite, DATE_FORMAT(fechaIngreso, "%d-%m-%Y") AS fechaIngreso FROM clientesnopotencializables WHERE documento = ?', [documento], (err, clientes) =>{
                if (err) {
                    throw err;
                }
                if( clientes.length > 0 ){
                    res.render('vistaConsultaClientes.ejs', {
                        data: clientes
                    }
                    );
                }
                else{
                    //console.log("NO HA ENCONTRADO A UN CLIENTE CON ESE DOCUMENTO");
                    req.flash('success', 'No se ha encontrado a ningún cliente con ese documento. Por favor ingrese de nuevo el documento');
                    res.redirect('/buscar');
                };
            });
        
    }
    else {
        res.redirect('/login');
    }
};


module.exports = controller;    