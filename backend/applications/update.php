<?php
require_once __DIR__ . '/../config/bootstrap.php';
requireLogin();

$data = getJsonInput();
$id = $data['id'] ?? null;

if (!$id) {
    respond(['success' => false, 'message' => 'Missing application id.'], 400);
}

// Make sure this application actually belongs to the logged-in user
$check = $pdo->prepare('SELECT id FROM applications WHERE id = ? AND user_id = ?');
$check->execute([$id, $_SESSION['user_id']]);
if (!$check->fetch()) {
    respond(['success' => false, 'message' => 'Application not found.'], 404);
}

$company = trim($data['company'] ?? '');
$role = trim($data['role'] ?? '');
$location = trim($data['location'] ?? '');
$jobType = $data['jobType'] ?? 'Internship';
$mode = $data['mode'] ?? 'Off-Campus';
$status = $data['status'] ?? 'Wishlist';
$dateApplied = $data['dateApplied'] ?? '';
$jobLink = trim($data['jobLink'] ?? '');
$notes = trim($data['notes'] ?? '');
$referral = !empty($data['referral']) ? 1 : 0;

if (!$company || !$role || !$location || !$dateApplied || !$jobLink) {
    respond(['success' => false, 'message' => 'Missing required fields.'], 400);
}

$stmt = $pdo->prepare(
    'UPDATE applications
     SET company=?, role=?, location=?, job_type=?, mode=?, status=?, date_applied=?, job_link=?, notes=?, referral=?
     WHERE id=? AND user_id=?'
);
$stmt->execute([
    $company, $role, $location, $jobType, $mode, $status, $dateApplied, $jobLink, $notes, $referral, $id, $_SESSION['user_id'],
]);

respond(['success' => true]);
