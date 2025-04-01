const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar con MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Ruta GET para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor en ejecución. Puedes hacer peticiones POST a /register");
});

// Registro de usuario
app.post("/register", async (req, res) => {
  console.log(req.body); // Añadir para depurar

  const { nombre, email, contrasena, confirmar_contrasena, dob } = req.body;

  // Verificar si faltan datos
  if (!nombre || !email || !contrasena || !confirmar_contrasena || !dob) {
    return res.status(400).json({ message: "Faltan datos. Todos los campos son obligatorios" });
  }

  // Verificar si las contraseñas coinciden
  if (contrasena !== confirmar_contrasena) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  // Verificar si el usuario ya existe
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error al consultar la base de datos" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    //En el caso de q quiera encriptar contraseña
    //en la base de datos aparecerá la contraseña encriptada del usuario
    //const salt = await bcrypt.genSalt(4);
    //const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Ya no se encripta la contraseña
    const hashedPassword = contrasena;


    // Insertar en la base de datos
    db.query("INSERT INTO usuarios (nombre, email, contrasena, dob) VALUES (?, ?, ?, ?)", 
      [nombre, email, hashedPassword, dob], 
      (err, result) => {
        if (err) {
          console.error("Error al insertar los datos:", err);  // Mostrar el error real en la consola
          return res.status(500).json({ message: "Error en la inserción de datos" });
        }
        res.status(201).json({ message: "Usuario registrado correctamente" });
      }
    );
  });
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
