
<?php
$servername = "localhost";
$username = "root";
$password = "Rosita100997";
$dbname = "tfg-rita";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
