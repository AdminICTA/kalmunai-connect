
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

// Only allow POST for marking messages as read
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['message_ids']) || !is_array($data['message_ids']) || empty($data['message_ids'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Message IDs are required'
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

// Prepare message IDs for SQL query
$messageIds = array_map(function($id) use ($conn) {
    return $conn->real_escape_string($id);
}, $data['message_ids']);

$messageIdsStr = "'" . implode("','", $messageIds) . "'";

// Update messages to mark as read
$sql = "UPDATE messages SET is_read = 1 WHERE id IN ($messageIdsStr)";
$result = $conn->query($sql);

if ($result) {
    echo json_encode([
        'success' => true,
        'message' => 'Messages marked as read',
        'count' => $conn->affected_rows
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to mark messages as read: ' . $conn->error
    ]);
}

$conn->close();
?>
