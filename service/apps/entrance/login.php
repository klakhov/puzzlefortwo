<?php
function getUserData($log,$pas){
  include '../connect/connections.php';
  $data = array();
  $query = "SELECT * FROM users WHERE nick='$log'";
  $result = $connect->query($query);
  $row = mysqli_fetch_row($result);
  $data["id"] = $row[0];
  $data["nick"] = $row[1];
  $data["password"] = $row[2];
  $data["email"] = $row[3];
  $data["status"] = $row[4];
  return $data;
};

include '../../classes/Undentified.php';
include '../../classes/User.php';
$login = $_POST['login'];
$password = $_POST['password'];
$undent_user = new Undentified($login,$password);
$response = array();
if($undent_user->userVerify()){
  $user = new User($login);
  $user->setUpUser();

  $userData = $user->getUserData();
  session_start();
  $_SESSION['login'] = $userData['login'];

  setcookie("logged", "yes", time()+3600,"/");

  $response["status"] = "SuccessfulLogin";
  $response = json_encode($response);
  echo $response;
}
else{
  $response["status"] = "UnsuccessfulLogin";
  $response = json_encode($response);
  echo $response;
}


?>
