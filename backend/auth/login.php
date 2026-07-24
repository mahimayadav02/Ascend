<?php
require_once __DIR__ . '/../config/bootstrap.php';

$data = getJsonInput();
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    respond(['success' => false, 'message' => 'Email and password are required.'], 400);
}

$stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    respond(['success' => false, 'message' => 'Invalid email or password.'], 401);
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];

respond(['success' => true, 'message' => 'Logged in.']);
