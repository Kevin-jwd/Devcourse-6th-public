// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Youtube",
});

// A simple SELECT query
connection.query("SELECT * FROM `users`", function (err, results, fields) {
    let { id, email, name, contact } = results[0];
    console.log(`id: ${id}`);
    console.log(`email: ${email}`);
    console.log(`name: ${name}`);
    console.log(`contact: ${contact}`);
});
