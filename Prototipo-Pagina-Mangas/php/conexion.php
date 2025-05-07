<?php
$host = "localhost";
$usuario = "root";
$contrasena = ""; // dejar vacío si no pusiste una contraseña en XAMPP
$bd = "kiwimangas"; // conecta a bd kiwi

$conn = new mysqli($host, $usuario, $contrasena, $bd);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>