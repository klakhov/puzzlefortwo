<?php
include '../connect/connections.php';
include '../../classes/Room.php';

$uid = $_POST['uid'];
$room = new Room($uid);
$room->constructByUid();
$time_close = $room->timestep_accept + 60;
$time_remain = $time_close - time();

$response = array();
$response['time_remain'] = $time_remain;

if($room->status == 'playing'){
  $response['status'] = "playing";
}elseif($time_remain<0){
  $room->updateStatusToClosed();
  $response['status'] = "closed";
}else{
  $response['status'] = "waiting";
};
$response = json_encode($response);
echo $response;
?>
