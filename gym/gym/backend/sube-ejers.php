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

// Obtener datos del formulario
$titulo = $_POST['titulo'];
$categoria = $_POST['categoria'];
$descripcion = $_POST['descripcion'];
$fecha_creacion = date("Y-m-d H:i:s");

// Convertir categorías a ID (puedes adaptar esto según cómo esté tu base de datos)
switch ($categoria) {
  case "fuerza": $categoria_id = 1; break;
  case "cardio": $categoria_id = 2; break;
  case "flexibilidad": $categoria_id = 3; break;
  case "gluteos": $categoria_id = 4; break;
  case "espalda": $categoria_id = 5; break;
  default: $categoria_id = 0; break;
}

// Insertar en la base de datos
$sql = "INSERT INTO ejercicios_rutinas (titulo, categoria_id, descripcion, fecha_creacion)
        VALUES ('$titulo', '$categoria_id', '$descripcion', '$fecha_creacion')";

if ($conn->query($sql) === TRUE) {
  // Redirigir a mis publicaciones si va bien
  header("Location: mis-publis.php");
  exit();
} else {
  echo "Error al subir el ejercicio: " . $conn->error;
}

$conn->close();
?>
