<?php
// ============================================
// BOOTSTRAP — included at the top of every endpoint.
// Starts the session, sets JSON headers, connects to DB.
// ============================================

session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

// Helper: send a JSON response and stop
function respond($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Helper: require the user to be logged in
function requireLogin() {
    if (!isset($_SESSION['user_id'])) {
        respond(['success' => false, 'message' => 'Not logged in.'], 401);
    }
}

// Helper: read JSON body sent via fetch()
function getJsonInput() {
    $data = json_decode(file_get_contents('php://input'), true);
    return $data ?? [];
}
