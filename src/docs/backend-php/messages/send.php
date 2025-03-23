
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

// Only allow POST for sending messages
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

if (!isset($data['sender_id']) || !isset($data['receiver_id']) || !isset($data['message'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Sender ID, receiver ID, and message are required'
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

// Generate a UUID
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// Sanitize inputs
$messageId = generateUUID();
$senderId = $conn->real_escape_string($data['sender_id']);
$receiverId = $conn->real_escape_string($data['receiver_id']);
$message = $conn->real_escape_string($data['message']);

// Insert the message
$sql = "INSERT INTO messages (id, sender_id, receiver_id, message) 
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ssss', $messageId, $senderId, $receiverId, $message);

if ($stmt->execute()) {
    // Get the inserted message
    $sql = "SELECT m.*, 
                   u.username as sender_name,
                   (SELECT username FROM users WHERE id = m.receiver_id) as receiver_name
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $messageId);
    $stmt->execute();
    $result = $stmt->get_result();
    $message = $result->fetch_assoc();
    
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully',
        'data' => $message
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message: ' . $stmt->error
    ]);
}

$conn->close();
?>
