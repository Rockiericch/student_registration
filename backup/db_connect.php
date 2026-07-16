<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

// Connection successful

?>