<?php
session_start();
include('config.php'); // Asegúrate de incluir tu archivo de conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta SQL para verificar el email y la contraseña
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar la contraseña
        if (password_verify($password, $user['password'])) {
            // Si la contraseña es correcta, guardar la información del usuario en la sesión
            $_SESSION['user_id'] = $user['id']; // Guardamos el ID del usuario en la sesión
            $_SESSION['email'] = $user['email']; // Guardamos el email en la sesión
            header("Location: ../inicio.html"); // Redirigir a la página de inicio (asegúrate que la ruta sea correcta)
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }
}
?>
