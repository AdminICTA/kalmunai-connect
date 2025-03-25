
<?php
// Enable CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET for fetching messages
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

// Get user ID from request
$userId = $_GET['user_id'] ?? '';

if (empty($userId)) {
    echo json_encode([
        'success' => false,
        'message' => 'User ID is required'
    ]);
    exit();
}

// Get all messages for the user
$sql = "SELECT m.*, 
               u.username as sender_name,
               (SELECT username FROM users WHERE id = m.receiver_id) as receiver_name
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.receiver_id = ? OR m.sender_id = ?
        ORDER BY m.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $userId, $userId);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode([
    'success' => true,
    'data' => $messages
]);

$conn->close();
?>
