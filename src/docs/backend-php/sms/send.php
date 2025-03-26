<?php
require_once '../config.php';

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

// Only allow POST for sending SMS
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(['success' => false, 'message' => 'Invalid request method'], 405);
}

// Verify JWT token
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (empty($authHeader) || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    sendResponse(['success' => false, 'message' => 'Unauthorized'], 401);
}

$token = $matches[1];
if (!verifyJWT($token)) {
    sendResponse(['success' => false, 'message' => 'Invalid token'], 401);
}

// Get user data from token
$userData = getUserFromToken($token);

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['contact']) || !isset($data['message'])) {
    sendResponse(['success' => false, 'message' => 'Contact number and message are required'], 400);
}

// SMS API configuration
$smsConfig = [
    'user_id' => '91',
    'api_key' => '7962bc5f-e252-4e41-88ed-9d5b7c512f2f',
    'sender_id' => 'SMSlenzDemo'
];

// Format phone number
$contact = formatPhoneNumber($data['contact']);
$message = $data['message'];

// Send SMS using cURL
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://smslenz.lk/api/send-sms',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => [
        'user_id' => $smsConfig['user_id'],
        'api_key' => $smsConfig['api_key'],
        'sender_id' => $smsConfig['sender_id'],
        'contact' => $contact,
        'message' => $message
    ]
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    sendResponse(['success' => false, 'message' => 'SMS API Error: ' . $err], 500);
} else {
    // Log the SMS in database
    $stmt = $conn->prepare("INSERT INTO sms_logs (user_id, contact, message, response, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssss", $userData['user_id'], $contact, $message, $response);
    $stmt->execute();
    
    sendResponse([
        'success' => true,
        'message' => 'SMS sent successfully',
        'data' => json_decode($response)
    ]);
}

/**
 * Format phone number to ensure it meets the required format (+9476XXXXXXX)
 */
function formatPhoneNumber($phoneNumber) {
    // Remove any non-digit characters except the plus sign
    $cleaned = preg_replace('/[^\d+]/', '', $phoneNumber);
    
    // If the number doesn't start with +94, add it
    if (strpos($cleaned, '+94') !== 0) {
        // If it starts with 0, replace the 0 with +94
        if (strpos($cleaned, '0') === 0) {
            $cleaned = '+94' . substr($cleaned, 1);
        } else {
            // Otherwise, just prepend +94
            $cleaned = '+94' . $cleaned;
        }
    }
    
    return $cleaned;
}
?>
