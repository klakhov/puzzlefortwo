<?php
include '../connect/connections.php';
session_start();
$login = $_SESSION['login'];

$time = time() - 300;

$query = "SELECT * FROM rooms WHERE timestep > '$time' AND status='waiting'";
$result = $connect->query($query);

$rows = mysqli_num_rows($result);
$data = array('number' => $rows, 'login'=> $login, 'rows' => array());
for($i=0; $i<$rows; $i++){
  $row = mysqli_fetch_row($result);
  $data['rows'][$i]['nick1'] = $row[1];
  $data['rows'][$i]['description'] = $row[5];
  $data['rows'][$i]['img'] = $row[4];
  $data['rows'][$i]['uid'] = $row[6];
}

$data = json_encode($data);
echo "$data";
?>
