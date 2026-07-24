<?php
require_once __DIR__ . '/../config/bootstrap.php';

$_SESSION = [];
session_destroy();

respond(['success' => true, 'message' => 'Logged out.']);
