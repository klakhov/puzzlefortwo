<?php
session_start();
include '../connect/connections.php';
include '../../classes/Room.php';
$room_uid = $_SESSION['room-uid'];
$room = new Room($room_uid);
$room->constructByUid();

$block1= $room->block1;

$response = array('top' => $block1['top'], 'left' => $block1['left']);

$response = json_encode($response);
echo $response;
?>
