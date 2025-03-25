<?php
// Database configuration
$dbHost = '162.214.204.205';
$dbPort = '3306';
$dbUser = 'dskalmunai_admin';
$dbPass = 'ITAdmin@1993';
$dbName = 'dskalmunai_recapp';

// Create database connection
function getDbConnection() {
    global $dbHost, $dbPort, $dbUser, $dbPass, $dbName;
    
    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}