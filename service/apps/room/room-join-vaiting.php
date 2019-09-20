<?php
session_start();
$login = $_SESSION['login'];

include '../connect/connections.php';
include '../../classes/Room.php';

$time = time()-300;

$query = "SELECT * FROM rooms WHERE user1='$login' AND status='playing'";
$result = $connect->query($query);
$row = mysqli_num_rows($result);
if($row>0){
  $row = mysqli_fetch_row($result);
  $uid = $row[6];
  $room = new Room($uid);
  $room->construct();
  $data = array('success' =>'roomFull' , 'room-uid'=>$room->uid, 'opponentNick'=>$room->user2);
}else{
  $data = array('success' => 'roomEmpty');
}
$data = json_encode($data);
echo $data;
?>
