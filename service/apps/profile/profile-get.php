<?php
include '../connect/connections.php';
include '../../classes/User.php';

session_start();
$login = $_SESSION['login'];

$user = new User($login);
$user->setUpUser();
$userData = $user->getUserData();
$userData["follows"] = unserialize($userData["follows"]);
$data = json_encode($userData);
echo $data;

?>
