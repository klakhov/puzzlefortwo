<?php
include '../connect/connections.php';

$time = time() - 300;

$query = "SELECT * FROM rooms WHERE timestep > '$time'";
$result = $connect->query($query);

$rows = mysqli_num_rows($result);
$data = array('number' => $rows, 'rows' => array());
for($i=0; $i<$rows; $i++){
  $row = mysqli_fetch_row($result);
  $data['rows'][$i]['id'] = $row[0];
  $data['rows'][$i]['nick1'] = $row[1];
  $data['rows'][$i]['description'] = $row[5];
  $data['rows'][$i]['img'] = $row[4];
}

$data = json_encode($data);
echo "$data";
?>
