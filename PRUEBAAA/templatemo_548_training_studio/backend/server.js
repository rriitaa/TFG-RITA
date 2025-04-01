const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mysql = require("mysql");
const app = express();
const port = 5000;

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sesiones
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true
  })
);

// Ruta para el login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario por el email
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error en la base de datos" });
    }
    
    // Si no encuentra al usuario
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result[0];

    // Verificar la contraseña
    bcrypt.compare(password, user.contrasena, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error al verificar la contraseña" });
      }

      if (isMatch) {
        // Iniciar sesión
        req.session.userId = user.id;
        return res.status(200).json({ message: "Login exitoso", redirect: "/inicio.html" });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    });
  });
});

// Servir archivos estáticos (si los tienes en una carpeta pública)
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
