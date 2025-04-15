<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "Rosita100997";
$dbname = "tfg-rita";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtener las publicaciones desde la base de datos
$sql = "SELECT titulo, categoria_id, fecha_creacion FROM ejercicios_rutinas ORDER BY fecha_creacion DESC";
$result = $conn->query($sql);

// Cerrar la conexión
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mis Publicaciones</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    /* Estilos generales */
    html, body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      background: url('assets/images/gym.jpg') no-repeat center center fixed;
      background-size: cover;
    }

    /* Header */
    .background-header {
      background: rgba(250,250,250,0.95);
      height: 80px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.15);
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

    .navbar {
      display: flex;
      gap: 20px;
    }

    .navbar a {
      text-decoration: none;
      color: #232d39;
      font-weight: 600;
      font-size: 16px;
    }

    .navbar a:hover {
      color: #ed563b;
    }

    /* Contenido principal */
    .main-content {
      padding-top: 120px;
      color: #fff;
      text-align: center;
    }

    .main-content h1 {
      font-size: 36px;
      margin-bottom: 40px;
    }

    /* Lista de publicaciones */
    .publi-list {
      list-style: none;
      padding: 0;
      margin: 0;
      max-width: 800px;
      margin: 0 auto;
    }

    .publi-item {
      background-color: rgba(246, 242, 242, 0.979);
      color: #323030;
      padding: 20px;
      margin: 15px 0;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .publi-item:hover {
      background-color: #ed563b;
    }

    .publi-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .publi-date {
      font-size: 14px;
      color: #ccc;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header class="background-header">
    <div class="header-area">
      <a href="index.html" class="logo">
        RB <em>SMART FIT</em>
      </a>
      <nav class="navbar">
        <a href="inicio.html">Inicio</a>
        <a href="categorias.html">Categorías</a>
        <a href="comunidad.html">Comunidad</a>
        <a href="mis-publis.php">Mis Publicaciones</a>
        <a href="perfil.html">Mi perfil</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <div class="main-content">
    <h1>Mis Publicaciones</h1>

    <ul class="publi-list">
      <?php
      // Mostrar las publicaciones
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          echo "<li class='publi-item' onclick=\"window.location.href='detalle-publi.html'\">
                  <div class='publi-title'>" . $row['titulo'] . "</div>
                  <div class='publi-date'>Fecha: " . $row['fecha_creacion'] . "</div>
                </li>";
        }
      } else {
        echo "<li>No tienes publicaciones.</li>";
      }
      ?>
    </ul>
  </div>

</body>
</html>
