<?php
include("conexion.php");

$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $mensaje = "Este correo ya está registrado 😖";
    } else {
        $insert = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insert);
        $stmt->bind_param("sss", $nombre, $correo, $hash);

        if ($stmt->execute()) {
            $mensaje = "¡Registro exitoso! 🥳 Ahora puedes iniciar sesión.";
        } else {
            $mensaje = "Error al registrar 😢: " . $stmt->error;
        }
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro - kiwiMANGAS</title>
  <style>
    body {
      background-color: #fff0f5;
      font-family: 'Quicksand', sans-serif;
      text-align: center;
      padding: 2rem;
    }
    form {
      background-color: #ffe6f0;
      padding: 20px;
      border-radius: 20px;
      display: inline-block;
      box-shadow: 0 0 10px #ffb6c1;
    }
    input {
      display: block;
      margin: 10px auto;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #ccc;
    }
    button {
      background-color: #ff69b4;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
    }
    .mensaje {
      margin-top: 10px;
      font-weight: bold;
      color: #d63384;
    }
  </style>
</head>
<body>
  <h1>💗 Registro en kiwiMANGAS 💗</h1>
  <?php if ($mensaje != "") echo "<p class='mensaje'>$mensaje</p>"; ?>
  <form method="POST" action="registro.php">
    <input type="text" name="nombre" placeholder="Tu nombre kawaii" required>
    <input type="email" name="correo" placeholder="Correo electrónico" required>
    <input type="password" name="contrasena" placeholder="Contraseña secreta" required>
    <button type="submit">¡Registrarme!</button>
  </form>
</body>
</html>
