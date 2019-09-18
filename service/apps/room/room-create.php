<?php
include '../connect/connections.php';
include '../../classes/Room.php';
session_start();
$login = $_SESSION['login'];
$image = $_POST['img-name'];
$description = $_POST['desctiption'];

$time = time();
$fetch_time = $time - 300;

$response = array();

$query = "SELECT * FROM rooms WHERE user1 = '$login' AND timestep > '$fetch_time'";
$result = $connect->query($query);
$rows = mysqli_num_rows($result);
if($rows>0){
  $response['success'] = 'roomAlreadySet';
}else{
  $response['success'] = 'roomCreated';
  $room = new Room(bin2hex(random_bytes(10)));
  $room->create($login,$time,$image,$description);
}

$data = json_encode($response);
echo $data;
?>
