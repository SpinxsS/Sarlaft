const Connection = require('tedious').Connection;

 //Configuracion del servidor de MySQL.
var config = {
  user: 'sa',
  password: 'Etropos1203*',
  server:'DESKTOP-7TLSAFT2',
  database:'APP_SARLAFT'
  };

  //proceso para la conexion con la base de datos.
  var connection = new Connection(config);

  connection.on('connect', function(err){
    if(err){
      console.log(err) 
    }
    else{
      console.log('connected') ;

    }
  });
  


 exports.conexion = conexion;