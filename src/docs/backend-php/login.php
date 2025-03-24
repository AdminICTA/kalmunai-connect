
<?php
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
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username_or_email']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Username/email and password are required'
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
$usernameOrEmail = $conn->real_escape_string($data['username_or_email']);
$password = $data['password']; // We'll compare directly since it's stored as plain text in your example

// Query to find user
$sql = "SELECT id, username, email, password, role_id, department_id FROM users 
        WHERE (username = '$usernameOrEmail' OR email = '$usernameOrEmail')";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Check password (in production, use password_verify for hashed passwords)
    if ($user['password'] === $password) {
        // Generate a simple token (in production, use a proper JWT)
        $token = bin2hex(random_bytes(32));
        
        // Remove password from user data
        unset($user['password']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid password'
        ]);
    }
} else {
    // DEMO USERS FOR TESTING
    if (($usernameOrEmail === "ICTA" && $password === "admin123") || 
        ($usernameOrEmail === "Staff" && $password === "staff123") || 
        ($usernameOrEmail === "User" && $password === "user123")) {
        
        $token = bin2hex(random_bytes(32));
        $role = "";
        $username = "";
        $email = "";
        $userId = "";
        $deptId = "";
        
        if ($usernameOrEmail === "ICTA") {
            $role = "Admin";
            $username = "ICTA";
            $email = "icta@dskalmunai.com";
            $userId = "u1";
            $deptId = "ADM1";
        } else if ($usernameOrEmail === "Staff") {
            $role = "Staff";
            $username = "Staff";
            $email = "staff@dskalmunai.com";
            $userId = "u3";
            $deptId = "LND1";
        } else {
            $role = "User";
            $username = "User";
            $email = "user@dskalmunai.com";
            $userId = "u5";
            $deptId = "NIC1";
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $userId,
                'username' => $username,
                'email' => $email,
                'role_id' => $role,
                'department_id' => $deptId
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
}

$conn->close();
?>
