<?php
require_once "conexion.php"; // Conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $correo = $_POST["correo"];
  $clave = $_POST["clave"];

  $sql = "SELECT * FROM usuarios WHERE correo = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $correo);
  $stmt->execute();
  $resultado = $stmt->get_result();

  if ($resultado->num_rows == 1) {
    $usuario = $resultado->fetch_assoc();
    if (password_verify($clave, $usuario["clave"])) {
      echo "success"; // Esto será leído por JS
    } else {
      echo "error";
    }
  } else {
    echo "error";
  }
}
?>
