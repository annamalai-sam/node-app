const mysql = require('mysql2');

function getDBConnection() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "AnnaMalai@19",
        database: "node_app"
    });
    con.connect(function (err) {
        if (err) {
            return err
        }
    })
    return con
}



module.exports = { getDBConnection }