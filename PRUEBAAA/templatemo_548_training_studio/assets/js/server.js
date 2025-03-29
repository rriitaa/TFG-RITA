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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



//REGISTRO DE USUARIOOOOOOOOOOOOOOOOOOOO
app.post("/register", async (req, res) => {
    const { nombre, email, contraseña } = req.body;
  
    // Verificar si el usuario ya existe
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
  
      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);
  
      // Insertar en la base de datos
      db.query("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)", 
        [nombre, email, hashedPassword], 
        (err, result) => {
          if (err) return res.status(500).json({ message: "Error en el servidor" });
          res.status(201).json({ message: "Usuario registrado correctamente" });
      });
    });
  });

  
  //LOGIN DE USUARIOOOOOOOOOOOOO
  app.post("/login", (req, res) => {
    const { email, contraseña } = req.body;
  
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
  
      const usuario = result[0];
      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
  
      if (!contraseñaValida) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
  
      // Crear token de autenticación
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Login exitoso", token });
    });
  });

  

  //SUBIR EJERCICIOOOOOOOOOOO
  app.post("/subir-ejercicio", (req, res) => {
    const { nombre, descripcion, categoria_id } = req.body;
  
    db.query(
      "INSERT INTO ejercicios (nombre, descripcion, categoria_id) VALUES (?, ?, ?)", 
      [nombre, descripcion, categoria_id], 
      (err, result) => {
        if (err) return res.status(500).json({ message: "Error al subir ejercicio" });
        res.status(201).json({ message: "Ejercicio subido correctamente" });
      }
    );
  });

  

  //VER CATEGORIAS Y EJERCISIOOOOOOOOOOOOOOOOS
  app.get("/categorias", (req, res) => {
    db.query("SELECT * FROM categorias", (err, result) => {
      if (err) return res.status(500).json({ message: "Error al obtener categorías" });
      res.json(result);
    });
  });
  
  app.get("/ejercicios/:categoria_id", (req, res) => {
    const { categoria_id } = req.params;
    db.query("SELECT * FROM ejercicios WHERE categoria_id = ?", [categoria_id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al obtener ejercicios" });
      res.json(result);
    });
  });

  

  //CREAR RUTINASSSSSSSSSS DE ENTRENAMINETOOOOOOOOOOO
  app.post("/crear-rutina", (req, res) => {
    const { usuario_id, nombre_rutina, descripcion } = req.body;
  
    db.query(
      "INSERT INTO rutinas (usuario_id, nombre_rutina, descripcion) VALUES (?, ?, ?)",
      [usuario_id, nombre_rutina, descripcion],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Error al crear rutina" });
        res.status(201).json({ message: "Rutina creada correctamente" });
      }
    );
  });

  

  //MOSTRAR RUTINAS GUARDADAS POR USUARIOOOOOOOOOOOOO
  app.get("/mis-rutinas/:usuario_id", (req, res) => {
    const { usuario_id } = req.params;
    db.query("SELECT * FROM rutinas WHERE usuario_id = ?", [usuario_id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al obtener rutinas" });
      res.json(result);
    });
  });

  
  
  