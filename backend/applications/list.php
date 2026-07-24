<?php
require_once __DIR__ . '/../config/bootstrap.php';
requireLogin();

$stmt = $pdo->prepare(
    'SELECT id, company, role, location, job_type AS jobType, mode, status,
            date_applied AS dateApplied, job_link AS jobLink, notes, referral
     FROM applications
     WHERE user_id = ?
     ORDER BY date_applied DESC'
);
$stmt->execute([$_SESSION['user_id']]);
$apps = $stmt->fetchAll();

foreach ($apps as &$app) {
    $app['referral'] = (bool) $app['referral'];
}

respond(['success' => true, 'applications' => $apps]);
