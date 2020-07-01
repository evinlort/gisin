<?php

require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$db = new mysqli('localhost', $_ENV['USER'], $_ENV['PASSWORD'], 'memory_app');
$query = 'select * from config';
$res = $db->query($query);
$row = $res->fetch_assoc();

$json = json_encode($row);
exit($json);
