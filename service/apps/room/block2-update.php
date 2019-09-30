<?php
session_start();
include '../connect/connections.php';
include '../../classes/Room.php';
$room_uid = $_SESSION['room-uid'];
$room = new Room($room_uid);
$room->constructByUid();

$block2 = $room->block2;

$response = array('top' => $block2['top'], 'left' => $block2['left']);

$response = json_encode($response);
echo $response;
?>
