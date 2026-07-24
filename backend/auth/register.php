<?php
require_once __DIR__ . '/../config/bootstrap.php';

$data = getJsonInput();
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$name || !$email || !$password) {
    respond(['success' => false, 'message' => 'All fields are required.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(['success' => false, 'message' => 'Enter a valid email address.'], 400);
}

if (strlen($password) < 6) {
    respond(['success' => false, 'message' => 'Password must be at least 6 characters.'], 400);
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    respond(['success' => false, 'message' => 'An account with this email already exists.'], 409);
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
$stmt->execute([$name, $email, $hash]);

$userId = $pdo->lastInsertId();

// Auto-login right after registering
$_SESSION['user_id'] = $userId;
$_SESSION['user_name'] = $name;
$_SESSION['user_email'] = $email;

respond(['success' => true, 'message' => 'Account created.']);
