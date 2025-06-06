const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");

    // Crear tabla 'tasks' si no existe
    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        done BOOLEAN NOT NULL DEFAULT FALSE
      )
    `;

    connection.query(createTasksTable, (err) => {
      if (err) {
        console.error("Error al crear la tabla 'tasks':", err);
      } else {
        console.log("Tabla 'tasks' verificada o creada con éxito");
      }
    });
  }
});

module.exports = connection;
