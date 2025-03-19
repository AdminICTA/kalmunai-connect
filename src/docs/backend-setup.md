
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
if (!isset($data['email']) || !isset($data['password'])) {
    sendResponse(['success' => false, 'message' => 'Email and password are required'], 400);
}

// Sanitize inputs
$email = sanitizeInput($data['email']);
$password = $data['password']; // Don't sanitize password before hashing

// Query the database
$stmt = $conn->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    sendResponse(['success' => false, 'message' => 'Invalid email or password'], 401);
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    sendResponse(['success' => false, 'message' => 'Invalid email or password'], 401);
}

// Generate JWT token
$token = generateJWT($user['id'], $user['role']);

// Prepare user data for response (exclude password)
$userData = [
    'id' => $user['id'],
    'name' => $user['name'],
    'email' => $user['email'],
    'role' => $user['role']
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
3. Store passwords using password_hash() and verify with password_verify()
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

Here's a basic SQL schema for the users table:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'employee', 'public') NOT NULL DEFAULT 'public',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create an admin user (password: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@dskalmunai.lk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
```

---

For additional assistance, contact the development team or refer to the technical documentation.
