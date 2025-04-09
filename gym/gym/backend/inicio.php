<?php
session_start();

// Verificar si el usuario está logueado
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html"); // Redirigir al login si no está logueado
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Inicio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        /* Estilos generales */
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: url('file:///C:/Documentos/AAATFG/TFG-RITA/TFG-RITA/PRUEBAAA/templatemo_548_training_studio/assets/images/gym.jpg') no-repeat center center fixed;
            background-size: cover;
        }

        /* Header */
        .background-header {
            background: rgba(250, 250, 250, 0.95);
            height: 80px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
            z-index: 100;
        }

        .header-area {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            height: 100%;
        }

        .logo {
            font-size: 32px;
            font-weight: 800;
            color: #232d39;
            text-transform: uppercase;
        }

        .logo em {
            font-style: normal;
            color: #ed563b;
        }

        /* Estilos de la página de inicio */
        .main-content {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            color: white;
            font-size: 20px;
        }

        .main-content h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .logout-button {
            padding: 12px 20px;
            background-color: #ed563b;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
        }

        .logout-button:hover {
            background-color: #f9735b;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header class="background-header">
        <div class="header-area">
            <a href="inicio.php" class="logo">
                RB <em>SMART FIT</em>
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <div class="main-content">
        <div>
            <h1>Bienvenido, <?php echo $_SESSION['email']; ?>!</h1>
            <p>Estás logueado y ahora puedes acceder a tus rutinas y más.</p>
            <a href="logout.php" class="logout-button">Cerrar sesión</a>
        </div>
    </div>

</body>
</html>
