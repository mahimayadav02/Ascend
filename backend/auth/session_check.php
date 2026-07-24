<?php
require_once __DIR__ . '/../config/bootstrap.php';

if (isset($_SESSION['user_id'])) {
    respond([
        'loggedIn' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email'],
        ],
    ]);
} else {
    respond(['loggedIn' => false]);
}
