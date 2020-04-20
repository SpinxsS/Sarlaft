const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION CON LA BASE DE DATOS SE HA PERDIDO');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION HA SIDO RECHAZADA');
        }
    }

    if(connection){
        connection.release();
        console.log('LA BASE DE DATOS ESTA CONECTADA');
        return;
    }
    
});

//Esta linea convierte en promesas lo que antes era callbacks
promisify(pool.query);

module.exports = pool;