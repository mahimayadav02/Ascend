<?php
require_once __DIR__ . '/../config/bootstrap.php';
requireLogin();

$stmt = $pdo->prepare(
    'SELECT name, email AS personalEmail, college_work_email AS collegeWorkEmail,
            status, college, branch, experience, DATE(created_at) AS joined
     FROM users WHERE id = ?'
);
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

if (!$user) {
    respond(['success' => false, 'message' => 'User not found.'], 404);
}

respond(['success' => true, 'user' => $user]);
