<?php
// Database configuration
$dbHost = 'localhost';
$dbPort = '3306';
$dbUser = 'dskalmun_Admin';
$dbPass = 'Itadmin@1993';
$dbName = 'dskalmun_RecApp';

// Create database connection
function getDbConnection() {
    global $dbHost, $dbPort, $dbUser, $dbPass, $dbName;
    
    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}