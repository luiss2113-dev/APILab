
var connection = require('../lib/db')
var mysql = require('mysql');

function insertarMedicamento(data, callback) {
    let inserQuery = "INSERT INTO Producto (nombre, detalle, precioVenta) VALUES (?, ?, ?)"
    let query = mysql.format(inserQuery, [data.nombre, data.detalle, data.precio]);
    connection.query(query, function (err, result) {
            if (err) throw err;
            callback(result);
        });
};

function obtenerMedicamentos(callback) {
    connection.query("select * from Producto", function (err, result) {
        if (err) throw err;
        callback(result);
    });
}


module.exports = { insertarMedicamento, obtenerMedicamentos }