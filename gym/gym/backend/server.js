const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const port = 3000;

// Configuración para que Express maneje los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de la sesión
app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: true
}));

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia por tu usuario de MySQL
    password: 'Rosita100997',  // Cambia por tu contraseña de MySQL
    database: 'tfg-rita'  // Cambia por el nombre de tu base de datos
});

// Verificar si la conexión a la base de datos es exitosa
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Ruta para el registro de usuarios (signup)
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Inserción de usuario en la base de datos
    const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
    db.execute(query, [email, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).send('Error al registrar usuario');
        }
        res.send('Usuario registrado con éxito');
    });
});

// Ruta para procesar el login (login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Consulta para encontrar al usuario por email
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.execute(query, [email], (err, results) => {
        if (err) {
            console.error('Error de consulta:', err);
            return res.status(500).send('Error en la base de datos');
        }

        // Si el usuario no existe
        if (results.length === 0) {
            return res.send('Usuario no encontrado');
        }

        // Si el usuario existe, verificar la contraseña
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error de comparación de contraseñas:', err);
                return res.status(500).send('Error al verificar la contraseña');
            }

            // Si las contraseñas coinciden
            if (isMatch) {
                // Guardamos la sesión del usuario
                req.session.user_id = user.id;
                req.session.email = user.email;

                // Redirigir a la página de inicio
                return res.redirect('/inicio.html');
            } else {
                return res.send('Contraseña incorrecta');
            }
        });
    });
});

// Ruta para mostrar la página de inicio (inicio.html)
app.get('/inicio.html', (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/login.html');
    }
    res.sendFile(__dirname + '/inicio.html');  // Asume que tienes un archivo inicio.html en el mismo directorio
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
