<?php
// Enable CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST for user registration
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit();
}

// Get and decode JSON request data
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Validate required fields
if (!isset($data['fullName']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['address']) || !isset($data['nic'])) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required'
    ]);
    exit();
}

// Database connection
$dbHost = '162.214.204.205';
$dbPort = '3306';
$dbUser = 'dskalmun_Admin';
$dbPass = 'Itadmin@1993';
$dbName = 'dskalmun_RecApp';

// Connect to the database
$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit();
}

// Check if email already exists
$email = $conn->real_escape_string($data['email']);
$checkEmail = $conn->query("SELECT id FROM users WHERE email = '$email'");

if ($checkEmail->num_rows > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Email already registered'
    ]);
    exit();
}

// Sanitize inputs
$fullName = $conn->real_escape_string($data['fullName']);
$phone = $conn->real_escape_string($data['phone']);
$address = $conn->real_escape_string($data['address']);
$nic = $conn->real_escape_string($data['nic']);
$status = $conn->real_escape_string($data['status'] ?? 'pending');

// Generate a unique user ID
$userId = uniqid('USER_');

// Insert new user
$insertQuery = "INSERT INTO users (id, username, email, phone, address, nic, status) VALUES ('$userId', '$fullName', '$email', '$phone', '$address', '$nic', '$status')";

if ($conn->query($insertQuery)) {
    // Fetch the newly created user data
    $newUser = [
        'id' => $userId,
        'username' => $fullName,
        'email' => $email,
        'phone' => $phone,
        'address' => $address,
        'nic' => $nic,
        'status' => $status
    ];
    
    echo json_encode([
        'success' => true,
        'message' => 'User registered successfully',
        'data' => $newUser
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to register user: ' . $conn->error
    ]);
}

$conn->close();
?>