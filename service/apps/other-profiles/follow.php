<?php
include '../connect/connections.php';

session_start();
$follows = unserialize($_SESSION["follows"]);
$other = $_SESSION["other-login"];
$login = $_SESSION["login"];

$haveFriend = false;
$size = count($follows);
for($i = 0; $i < $size; $i++) {
  if($follows[$i] == $other) {
    $haveFriend = true;

    unset($follows[$i]);


    // array_values($follows); do not work because use foreach
    $tmp = array();
    foreach ($follows as $value) {
      $tmp[] = $value;
    }
    $follows = $tmp;


    $str_follows = serialize($follows);
    $_SESSION["follows"] = $str_follows;

    $query = "UPDATE `users` SET follows = '$str_follows' WHERE `nick` = '$login'";
    $connect->query($query);

    $data = array();
    $data["response"] = "no";
    $data["follows"] = $follows;
    $response = json_encode($data);
    echo $response;
    break;
  }
}
if(!$haveFriend) {
  $follows[] = $other;


  // array_values($follows); do not work because use foreach
  $tmp = array();
  foreach ($follows as $value) {
    $tmp[] = $value;
  }
  $follows = $tmp;

  $str_follows = serialize($follows);
  $_SESSION["follows"] = $str_follows;

  $query = "UPDATE `users` SET follows = '$str_follows' WHERE `nick` = '$login'";
  $connect->query($query);

  $data = array();
  $data["response"] = "yes";
  $data["follows"] = $follows;
  $response = json_encode($data);
  echo $response;
}


 ?>
