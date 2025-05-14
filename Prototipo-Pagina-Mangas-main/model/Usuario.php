<?php

require_once '../config/base.php';

class Usuario
{
    private $pdo;
    function __construct()
    {
        $this->pdo = Conexion();
    }

    public function listarUsuario()
    {
        $query = "SELECT * From usuario";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function crearUsuario($nombre, $email, $passwordHash)
    {
        $query = "INSERT INTO usuario(nombre, email, password) VALUES (?,?,?)";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$nombre, $email, $passwordHash]);
        return $stmt;
    }
    public function obtenerUsuarioPorEmail($email)
    {
        $query = "SELECT * FROM usuario WHERE email = ?";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC); // retorna solo un usuario
    }
    public function obtenerUsuarioPorNombre($nombre) {
        $query = "SELECT * FROM usuario WHERE nombre = ?";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$nombre]);
        return $stmt->fetch(PDO::FETCH_ASSOC); // retorna solo un usuario
    }
        public function obtenerUsuarioid($id) 
        {
        $query = "SELECT * FROM usuario WHERE id = ?";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function eliminarUsuario($id) 
    {
        $query1 = "DELETE FROM favoritos WHERE usuario_id = ?";
        $stmt1 = $this->pdo->prepare($query1);
        $stmt1->execute([$id]);

        $query2 = "DELETE FROM usuario WHERE id = ?";
        $stmt2 = $this->pdo->prepare($query2);
        return $stmt2->execute([$id]);
    }
    public function modificarUsuario($id, $nombre, $email, $admin)
    {
        $query = "UPDATE usuario SET nombre = ?, email = ?, admin = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute([$nombre, $email, $admin, $id]);
    }
}

?>