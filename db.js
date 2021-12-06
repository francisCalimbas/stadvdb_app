const mysql = require("mysql2");

// create the connection to database

//Vhino
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Javachip_1199",
//   port: "3306",
//   database: "imdb_dw",
// });

// raven
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  port: "3310",
  database: "imdb_dw",
});

// francis
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "12345",
//   port: "3306",
//   database: "imdb_dw1",
// });

db.connect();

// db.query(
//     'SELECT * FROM fact_table LIMIT 0, 10',
//     function(err, results, fields) {
//       console.log(results); // results contains rows returned by server
//     //   console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

module.exports = {
  db: db,
};
