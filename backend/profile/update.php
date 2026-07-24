<?php
require_once __DIR__ . '/../config/bootstrap.php';
requireLogin();

$data = getJsonInput();

$name = trim($data['name'] ?? '');
$personalEmail = trim($data['personalEmail'] ?? '');
$collegeWorkEmail = trim($data['collegeWorkEmail'] ?? '');
$college = trim($data['college'] ?? '');
$branch = trim($data['branch'] ?? '');
$experience = trim($data['experience'] ?? '');
$status = $data['status'] ?? 'Student';

if (!$name) {
    respond(['success' => false, 'message' => 'Name is required.'], 400);
}

if ($personalEmail && !filter_var($personalEmail, FILTER_VALIDATE_EMAIL)) {
    respond(['success' => false, 'message' => 'Enter a valid personal email.'], 400);
}

if ($collegeWorkEmail && !filter_var($collegeWorkEmail, FILTER_VALIDATE_EMAIL)) {
    respond(['success' => false, 'message' => 'Enter a valid college/work email.'], 400);
}

// Personal email doubles as the login email — make sure it's not already taken
if ($personalEmail) {
    $check = $pdo->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
    $check->execute([$personalEmail, $_SESSION['user_id']]);
    if ($check->fetch()) {
        respond(['success' => false, 'message' => 'That email is already in use by another account.'], 409);
    }
}

$stmt = $pdo->prepare(
    'UPDATE users SET name=?, email=?, college_work_email=?, college=?, branch=?, experience=?, status=? WHERE id=?'
);
$stmt->execute([$name, $personalEmail, $collegeWorkEmail, $college, $branch, $experience, $status, $_SESSION['user_id']]);

// Keep the session in sync with the new name/email
$_SESSION['user_name'] = $name;
$_SESSION['user_email'] = $personalEmail;

respond(['success' => true]);
