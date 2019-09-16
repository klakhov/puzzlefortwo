<?php
session_start();
$login = $_SESSION['login'];

$time = time();
setcookie("login", "$login", time()+3600,"/");
setcookie("time", "$time", time()+3600,"/");
$query = "UPDATE `users` SET `status`='$time' WHERE `nick`='$login'";

include '../connect/connections.php';
$connect->query($query);
?>
