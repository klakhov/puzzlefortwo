<?php
include '../connect/connections.php';
session_start();
$login = $_SESSION['login'];

$time = time() - 300;

$query = "SELECT * FROM rooms WHERE timestep > '$time' AND status <> 'lobby'";
$result = $connect->query($query);

$rows = mysqli_num_rows($result);
$data = array('number' => $rows, 'room-uids' => array());

for ($i=0; $i < $rows; $i++) {
  $row = mysqli_fetch_row($result);
  $data['room-uids'][$i] = $row[6];
}
$data = json_encode($data);
echo $data;
?>
