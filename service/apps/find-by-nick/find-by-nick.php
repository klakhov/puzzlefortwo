<?php
include '../connect/connections.php';
//include '../../classes/User.php';

session_start();
$my_login = $_SESSION['login'];
$login = $_POST['login'];

if($my_login != $login) {
  $query = "SELECT * FROM `users` WHERE `nick` = '$login'";
  $result = $connect->query($query);

  $row = mysqli_fetch_row($result);
  if(count($row) > 0) {

      // By class User??;
      session_start();
      $_SESSION['other-login'] = $login;

      $data = array();
      $data["response"] = "true";
      $data["id"] = $row[0];
      $data["login"] = $row[1];
      $data["email"] = $row[3];
      $data["status"] = $row[4];
      if(unserialize($_SESSION['follows']) == null) {
        $data["inFollow"] = "false";
        $data["why"] = "no array";
        $_SESSION['follows'] = serialize(array());
      }
      else if(in_array($login, unserialize($_SESSION['follows']))) {
        $data["why"] = "in array";
        $data["inFollow"] = "true";
      }
      else {
        $data["inFollow"] = "false";
        $data["why"] = "not in array";
      }
      $data = json_encode($data);
      echo $data;
  }
  else {
      $data = array();
      $data["response"] = "false";
      $data = json_encode($data);
      echo $data;
  }
}

else {
    $data = array();
    $data["response"] = "you";
    $data["why"] = "your account";
    $data = json_encode($data);
    echo $data;
}
?>
