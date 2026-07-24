<?php
require_once __DIR__ . '/../config/bootstrap.php';
requireLogin();

$data = getJsonInput();

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
    'INSERT INTO applications (user_id, company, role, location, job_type, mode, status, date_applied, job_link, notes, referral)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([
    $_SESSION['user_id'], $company, $role, $location, $jobType, $mode, $status, $dateApplied, $jobLink, $notes, $referral,
]);

respond(['success' => true, 'id' => $pdo->lastInsertId()]);
