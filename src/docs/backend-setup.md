
# Backend Setup Guide for Kalmunai Divisional Secretariat App

This document outlines the steps needed to set up the PHP backend for the Kalmunai Divisional Secretariat application.

## Server Requirements

- PHP 7.4 or higher
- MySQL 8.0 or higher
- Apache/Nginx web server
- PHP extensions: mysqli, json, mbstring

## Database Connection

Create a `config.php` file in your backend root directory with the following content:

```php
<?php
// Database configuration
$dbHost = '162.214.204.205';    // Database host
$dbPort = '3306';               // Database port
$dbUser = 'dskalmun_Admin';     // Database username
$dbPass = 'Itadmin@1993';       // Database password
$dbName = 'dskalmun_database';  // Database name

// Connection creation
$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set
$conn->set_charset("utf8mb4");

// JWT Secret Key for authentication tokens
define('JWT_SECRET', 'your_secure_jwt_secret_key_here');
?>
```

## API Structure

Create the following directory structure on your server:

```
/api
  /auth
    login.php
    register.php
    logout.php
  /users
    get-all.php
    get-by-id.php
    create.php
    update.php
    delete.php
  /services
    get-all.php
    get-by-id.php
    apply.php
  /stats
    admin.php
    staff.php
    public.php
  config.php
  functions.php
```

## Authentication System

Create a `functions.php` file for shared utilities:

```php
<?php
require_once 'config.php';

// Generate a JSON web token
function generateJWT($userId, $role) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 60 * 60 * 24; // Valid for 24 hours
    
    $payload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'user_id' => $userId,
        'role' => $role
    ];
    
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode($payload));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    
    return "$header.$payload.$signature";
}

// Verify JWT token
function verifyJWT($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }
    
    $header = base64_decode($parts[0]);
    $payload = base64_decode($parts[1]);
    $signature = $parts[2];
    
    $expectedSignature = base64_encode(hash_hmac('sha256', "$parts[0].$parts[1]", JWT_SECRET, true));
    
    if ($signature !== $expectedSignature) {
        return false;
    }
    
    $payload = json_decode($payload, true);
    if ($payload['exp'] < time()) {
        return false;
    }
    
    return $payload;
}

// Get authenticated user from JWT token
function getAuthenticatedUser() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        return null;
    }
    
    $authHeader = $headers['Authorization'];
    if (strpos($authHeader, 'Bearer ') !== 0) {
        return null;
    }
    
    $token = substr($authHeader, 7);
    return verifyJWT($token);
}

// Check if user has required role
function checkRole($requiredRoles) {
    $user = getAuthenticatedUser();
    if (!$user) {
        return false;
    }
    
    if (!is_array($requiredRoles)) {
        $requiredRoles = [$requiredRoles];
    }
    
    return in_array($user['role'], $requiredRoles);
}

// Send JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Sanitize input data
function sanitizeInput($data) {
    global $conn;
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitizeInput($value);
        }
        return $data;
    }
    return $conn->real_escape_string(trim($data));
}
?>
```

## Example Endpoint: Login

Create `auth/login.php`:

```php
<?php
require_once '../config.php';
require_once '../functions.php';

// Allow cross-origin requests during development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

// Get and decode JSON request data
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Validate required fields
if (!isset($data['username_or_email']) || !isset($data['password'])) {
    sendResponse(['success' => false, 'message' => 'Username/email and password are required'], 400);
}

// Sanitize inputs
$usernameOrEmail = sanitizeInput($data['username_or_email']);
$password = $data['password']; // Don't sanitize password before verification

// Query the database - check if input matches username or email
$stmt = $conn->prepare("SELECT id, username, email, password, role_id, department_id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    sendResponse(['success' => false, 'message' => 'Invalid username/email or password'], 401);
}

$user = $result->fetch_assoc();

// Simple password verification (for this example, we're using plaintext passwords as in your sample data)
// In a production environment, you should use password_hash and password_verify
if ($password !== $user['password']) {
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
?>
```

## CORS Configuration

Create a `.htaccess` file in your API root directory:

```
# Enable CORS
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
</IfModule>

# Handle OPTIONS method
RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

## Security Considerations

1. Use prepared statements for all database queries to prevent SQL injection
2. Validate and sanitize all user inputs
3. In production, use password_hash() to store passwords and password_verify() to check them
4. Implement proper JWT token validation
5. Set up HTTPS for all API endpoints
6. Consider implementing rate limiting to prevent brute force attacks

## Deployment Steps

1. Upload the PHP files to your server's web directory (e.g., `/public_html/api/`)
2. Set proper file permissions (usually 644 for files and 755 for directories)
3. Ensure the database exists and has the correct tables
4. Test the API endpoints using tools like Postman or cURL
5. Configure your React app to use the correct API URL

## Database Schema Example

Your provided users schema:

```sql
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role_id` varchar(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `department_id` varchar(36) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Sample data for users table
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `department_id`, `created_at`, `updated_at`) VALUES
('u1', 'ICTA', 'icta@dskalmunai.com', '1993', 'Admin', 'ADM1', NULL, NULL),
('u2', 'Farhana', 'farhana@dskalmunai.com', '0726', 'Admin', 'ADR1', NULL, NULL),
('u3', 'Marliya', 'marliya@dskalmunai.com', '1966', 'User', 'ACC1', NULL, NULL),
('u4', 'Maya', 'maya@dskalmunai.com', '1991', 'User', 'NIC1', NULL, NULL);
```

---

For additional assistance, contact the development team or refer to the technical documentation.
