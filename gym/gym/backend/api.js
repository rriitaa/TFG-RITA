import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rosita100997',
    database: 'tfg-rita'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta para el registro de usuario
app.post("/register", (req, res) => {
    const { nombre, email, contrasena, dob } = req.body;

    // Validación básica de los datos
    if (!nombre || !email || !contrasena || !dob) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    // Insertar el nuevo usuario en la base de datos
    const query = "INSERT INTO users (nombre, email, contrasena, dob) VALUES (?, ?, ?, ?)";
    db.query(query, [nombre, email, contrasena, dob], (err, result) => {
        if (err) {
            console.error("Error al registrar usuario:", err);
            return res.status(500).send("Error al registrar usuario");
        }
        res.status(200).send("Usuario registrado con éxito");
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
