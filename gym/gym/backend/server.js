const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos
app.use(express.static(path.join(__dirname, '..')));

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ✅ Registro de usuario con contraseña cifrada
app.post("/register", async (req, res) => {
  console.log(req.body);

  const { nombre, email, contrasena, confirmar_contrasena, dob } = req.body;

  if (!nombre || !email || !contrasena || !confirmar_contrasena || !dob) {
    return res.status(400).json({ message: "Faltan datos. Todos los campos son obligatorios" });
  }

  if (contrasena !== confirmar_contrasena) {
    return res.status(400).json({ message: "Las contraseñas no coinciden" });
  }

  // 🔍 Verificar si el usuario ya existe
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error al consultar la base de datos" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    try {
      // 🔒 Cifrar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      // 📥 Insertar el usuario en la base de datos
      db.query(
        "INSERT INTO usuarios (nombre, email, contrasena, dob) VALUES (?, ?, ?, ?)",
        [nombre, email, hashedPassword, dob],
        (err, result) => {
          if (err) {
            console.error("Error al insertar los datos:", err);
            return res.status(500).json({ message: "Error en la inserción de datos" });
          }
          res.status(201).json({ message: "Usuario registrado correctamente" });
        }
      );
    } catch (err) {
      console.error("Error al cifrar la contraseña:", err);
      res.status(500).json({ message: "Error al procesar la contraseña" });
    }
  });
});

// ✅ Login de usuario con verificación de contraseña cifrada
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    // 🔍 Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Login exitoso",
      nombre: user.nombre,
      token: "jwt_token_o_algún_identificador" // opcional
    });
  });
});

// ✅ Subir ejercicio
app.post("/subir-ejercicio", (req, res) => {
  console.log(req.body);

  const { titulo, categoria, descripcion } = req.body;

  if (!titulo || !categoria || !descripcion) {
    return res.status(400).json({ message: "Faltan datos. Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO ejercicios (titulo, categoria, descripcion) VALUES (?, ?, ?)";
  db.query(query, [titulo, categoria, descripcion], (err, result) => {
    if (err) {
      console.error("Error al insertar el ejercicio:", err);
      return res.status(500).json({ message: "Error al insertar el ejercicio" });
    }

    res.status(201).json({ message: "Ejercicio subido correctamente" });
  });
});

// 🟢 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
