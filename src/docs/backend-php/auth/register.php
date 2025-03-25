<?php
require_once '../config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
    sendResponse(['success' => false, 'message' => 'Username, email and password are required'], 400);
}

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];
$role_id = isset($data['role_id']) ? $data['role_id'] : 'User'; // Default role
$department_id = isset($data['department_id']) ? $data['department_id'] : null;

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(['success' => false, 'message' => 'Invalid email format'], 400);
}

// Check if username or email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    sendResponse(['success' => false, 'message' => 'Username or email already exists'], 409);
}

// Validate password strength
if (strlen($password) < 8) {
    sendResponse(['success' => false, 'message' => 'Password must be at least 8 characters long'], 400);
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user with additional fields
$stmt = $conn->prepare("INSERT INTO users (username, email, password, role_id, department_id, created_at, status) VALUES (?, ?, ?, ?, ?, NOW(), 'active')");
$stmt->bind_param("sssss", $username, $email, $hashedPassword, $role_id, $department_id);

if ($stmt->execute()) {
    $userId = $stmt->insert_id;
    
    // Generate JWT token
    $token = generateJWT($userId, $role_id);
    
    // Prepare user data for response
    $userData = [
        'id' => $userId,
        'username' => $username,
        'email' => $email,
        'role_id' => $role_id,
        'department_id' => $department_id
    ];
    
    sendResponse([
        'success' => true,
        'message' => 'Registration successful',
        'token' => $token,
        'user' => $userData
    ]);
} else {
    sendResponse(['success' => false, 'message' => 'Registration failed: ' . $stmt->error], 500);
}
?>