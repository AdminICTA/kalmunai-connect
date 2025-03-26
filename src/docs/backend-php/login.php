
<?php
// Include configuration file
require_once 'config.php';

// Enable CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST for login
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Invalid request method'], 405);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['username_or_email']) || !isset($data['password'])) {
    sendResponse(['success' => false, 'message' => 'Username/email and password are required'], 400);
}

// Sanitize inputs
$usernameOrEmail = $conn->real_escape_string($data['username_or_email']);
$password = $data['password'];

// Prepare SQL statement to check both username and email
$stmt = $conn->prepare("SELECT id, username, email, password, role_id, department_id FROM users WHERE (username = ? OR email = ?)");
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    sendResponse(['success' => false, 'message' => 'Invalid username/email or password'], 401);
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    sendResponse(['success' => false, 'message' => 'Invalid username/email or password'], 401);
}

// Generate JWT token
$token = generateJWT($user['id'], $user['role_id']);

// Prepare user data for response (exclude password)
$userData = [
    'id' => $user['id'],
    'username' => $user['username'],
    'email' => $user['email'],
    'role_id' => $user['role_id'],
    'department_id' => $user['department_id']
];

// Send successful response with token and user data
sendResponse([
    'success' => true, 
    'message' => 'Login successful',
    'token' => $token,
    'user' => $userData
]);
