<?php
// Conexión a la base de datos
$servername = "localhost"; // Cambia esto si tu base de datos está en otro servidor
$username = "root"; // Tu usuario de MySQL
$password = "Rosita100997"; // Tu contraseña de MySQL
$dbname = "tfg-rita"; // El nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Verificar que los datos fueron enviados
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $titulo = $_POST['titulo-ejercicio'];
    $categoria = $_POST['categoria-ejercicio'];
    $descripcion = $_POST['descripcion-ejercicio'];

    // Preparar la consulta SQL
    $sql = "INSERT INTO ejercicios_rutinas (titulo, descripcion, categoria_id) VALUES (?, ?, ?)";

    // Preparar y vincular la declaración
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $titulo, $descripcion, $categoria_id);

    // Asignar el valor de la categoría según lo seleccionado en el formulario
    switch ($categoria) {
        case 'fuerza':
            $categoria_id = 1;
            break;
        case 'cardio':
            $categoria_id = 2;
            break;
        case 'flexibilidad':
            $categoria_id = 3;
            break;
        case 'gluteos':
            $categoria_id = 4;
            break;
        case 'espalda':
            $categoria_id = 5;
            break;
        default:
            $categoria_id = 0; // Valor por defecto
            break;
    }

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "Ejercicio subido correctamente.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Cerrar la conexión
    $stmt->close();
    $conn->close();
}
?>
