<?php

require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$db = new mysqli('127.0.0.1', $_ENV['USERNAME'], $_ENV['PASSWORD'], 'memory_app', $_ENV['PORT']);
$query = 'select * from config';
$res = $db->query($query);
$row = $res->fetch_assoc();

$json = json_encode($row);
exit($json);
