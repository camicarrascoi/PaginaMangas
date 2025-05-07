<?php

// Cambia "1234" por la contraseña que quieras usar
$hash = password_hash("1234", PASSWORD_DEFAULT);

echo "Tu contraseña hasheada es: <br>";
echo $hash;

?>