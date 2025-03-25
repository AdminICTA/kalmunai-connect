<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Database configuration
$dbHost = '162.214.204.205';    // Database host
$dbPort = '3306';               // Database port
$dbUser = 'dskalmun_Admin';     // Database username
$dbPass = 'Itadmin@1993';       // Database password
$dbName = 'dskalmun_RecApp';  // Database name

// Connection creation
$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Set character set
$conn->set_charset('utf8mb4');

// JWT Configuration
define('JWT_SECRET', 'dskalmunai_secure_jwt_secret_2024');
define('JWT_EXPIRY', 86400); // 24 hours in seconds

// Helper function to send JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Helper function to generate JWT token
function generateJWT($userId, $roleId) {
    $issuedAt = time();
    $expiryTime = $issuedAt + JWT_EXPIRY;
    
    $payload = [
        'user_id' => $userId,
        'role_id' => $roleId,
        'iat' => $issuedAt,
        'exp' => $expiryTime
    ];
    
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    $signature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, JWT_SECRET, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . '.' . $base64Payload . '.' . $base64Signature;
}

// Helper function to verify JWT token
function verifyJWT($token) {
    try {
        $tokenParts = explode('.', $token);
        if (count($tokenParts) != 3) {
            return false;
        }
        
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1])), true);
        
        if ($payload === null || !isset($payload['exp']) || $payload['exp'] < time()) {
            return false;
        }
        
        $signature = hash_hmac('sha256', $tokenParts[0] . '.' . $tokenParts[1], JWT_SECRET, true);
        $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return hash_equals($base64Signature, $tokenParts[2]);
    } catch (Exception $e) {
        return false;
    }
}

// Helper function to get user data from JWT token
function getUserFromToken($token) {
    $tokenParts = explode('.', $token);
    $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1])), true);
    return $payload;
}
?>