<?php
session_start();
include '../connect/connections.php';
include '../../classes/Room.php';
$room_uid = $_SESSION['room-uid'];
$room = new Room($room_uid);
$room->constructByUid();

$top = $_POST['top'];
$left = $_POST['left'];
$num = $_POST['block'];

if($num == 1){
  $block1 = array('top' => $top,'left'=>$left );
  $block1 = serialize($block1);
  $query = "UPDATE rooms
  SET block1 = '$block1'
  WHERE uid='$room_uid'";
  $connect->query($query);


}elseif($num == 2){
  $block2 = array('top' => $top,'left'=>$left );
  $block2 = serialize($block2);
  $query = "UPDATE rooms
  SET block2 = '$block2'
  WHERE uid='$room_uid'";
  $connect->query($query);
}
?>
