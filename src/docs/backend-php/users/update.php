
<?php
// Enable CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow PUT for updating users
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit();
}

// Check for auth token
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (empty($authHeader) || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized access'
    ]);
    exit();
}

// In a real app, validate the token properly
$token = $matches[1];

// Get and decode JSON request data
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Validate required fields
if (!isset($data['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'User ID is required'
    ]);
    exit();
}

// Database connection
$dbHost = '162.214.204.205';
$dbPort = '3306';
$dbUser = 'dskalmun_Admin';
$dbPass = 'Itadmin@1993';
$dbName = 'dskalmun_database';

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

// Sanitize inputs
$userId = $conn->real_escape_string($data['id']);

// Build update query based on provided fields
$updateFields = [];

if (isset($data['username'])) {
    $username = $conn->real_escape_string($data['username']);
    $updateFields[] = "username = '$username'";
}

if (isset($data['email'])) {
    $email = $conn->real_escape_string($data['email']);
    $updateFields[] = "email = '$email'";
}

// Check if password update is requested
if (isset($data['current_password']) && isset($data['new_password'])) {
    $currentPassword = $data['current_password'];
    $newPassword = $conn->real_escape_string($data['new_password']);
    
    // Verify current password
    $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
        exit();
    }
    
    $user = $result->fetch_assoc();
    
    // Simple password verification (for this example)
    // In production, use password_verify for hashed passwords
    if ($user['password'] !== $currentPassword) {
        echo json_encode([
            'success' => false,
            'message' => 'Current password is incorrect'
        ]);
        exit();
    }
    
    $updateFields[] = "password = '$newPassword'";
}

// If no fields to update, return success
if (empty($updateFields)) {
    echo json_encode([
        'success' => true,
        'message' => 'No changes to update'
    ]);
    exit();
}

// Construct and execute update query
$updateQuery = "UPDATE users SET " . implode(", ", $updateFields) . " WHERE id = '$userId'";
$result = $conn->query($updateQuery);

if ($result) {
    echo json_encode([
        'success' => true,
        'message' => 'User updated successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update user: ' . $conn->error
    ]);
}

$conn->close();
?>
