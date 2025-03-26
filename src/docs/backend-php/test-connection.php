
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

// Only allow GET for testing connection
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

// Database connection parameters - ensure these match your cPanel credentials
$dbHost = 'localhost'; // Use 'localhost' for cPanel
$dbPort = '3306';
$dbUser = 'dskalmun_Admin';
$dbPass = 'Itadmin@1993';
$dbName = 'dskalmun_RecApp';

// Test database connection
try {
    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName, $dbPort);
    
    if ($conn->connect_error) {
        throw new Exception($conn->connect_error);
    }
    
    // Test query to verify database access
    $testQuery = "SHOW TABLES";
    $result = $conn->query($testQuery);
    
    if (!$result) {
        throw new Exception("Failed to execute test query");
    }
    
    $tables = [];
    while ($row = $result->fetch_array(MYSQLI_NUM)) {
        $tables[] = $row[0];
    }
    
    // Get server info
    $serverInfo = [
        'server_version' => $conn->server_info,
        'protocol_version' => $conn->protocol_version,
        'server_info' => $conn->get_server_info(),
        'client_info' => $conn->get_client_info(),
        'host_info' => $conn->host_info,
        'connection_stats' => $conn->stat
    ];
    
    echo json_encode([
        'success' => true,
        'message' => 'Database connection successful',
        'connection_details' => [
            'host' => $dbHost,
            'database' => $dbName,
            'port' => $dbPort,
            'tables_found' => count($tables),
            'available_tables' => $tables,
            'server_info' => $serverInfo
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed',
        'error' => $e->getMessage(),
        'connection_details' => [
            'host' => $dbHost,
            'database' => $dbName,
            'port' => $dbPort
        ]
    ]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>
