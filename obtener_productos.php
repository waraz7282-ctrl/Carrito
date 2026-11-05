<?php

$host = 'localhost';
$dbname = 'carrito';
$username = 'root';
$password ='';

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$stmt = $conn->query("SELECT id, nombre, precio, imagen FROM  productos");
$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($productos);

?>