<?php
include("conexion.php");

$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];

// Buscar al usuario por correo
$sql = "SELECT * FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();

    // Verificar la contraseña hasheada
    if (password_verify($contrasena, $usuario['contraseña'])) {
        echo "¡Bienvenido, " . $usuario['nombre'] . "! 🌸 Has iniciado sesión con éxito.";
        // Aquí podrías guardar sesión y redirigir:
        // session_start();
        // $_SESSION['usuario'] = $usuario['nombre'];
        // header("Location: inicio.php");
    } else {
        echo "Contraseña incorrecta 💔";
    }
} else {
    echo "No existe un usuario con ese correo 😢";
}

$conn->close();
?>

