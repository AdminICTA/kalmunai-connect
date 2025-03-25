<?php
require_once '../config.php';

function authenticateRequest() {
    // Get headers
    $headers = getallheaders();
    
    // Check if Authorization header exists
    if (!isset($headers['Authorization'])) {
        sendResponse(['success' => false, 'message' => 'No authorization token provided'], 401);
    }
    
    // Get token from Authorization header
    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);
    
    // Verify token
    if (!verifyJWT($token)) {
        sendResponse(['success' => false, 'message' => 'Invalid or expired token'], 401);
    }
    
    // Get user data from token
    $userData = getUserFromToken($token);
    
    // Return user data for use in protected routes
    return $userData;
}

function requireRole($requiredRole) {
    $userData = authenticateRequest();
    
    // Check if user has required role
    if ($userData['role_id'] !== $requiredRole) {
        sendResponse([
            'success' => false,
            'message' => 'Access denied. Insufficient permissions.'
        ], 403);
    }
    
    return $userData;
}
?>