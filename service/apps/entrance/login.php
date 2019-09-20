<?php
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
  $_SESSION['id'] = $userData['id'];
  $_SESSION['login'] = $userData['login'];
  $_SESSION['email'] = $userData['email'];
  $_SESSION['status'] = $userData['status'];
  $_SESSION['follows'] = $userData['follows'];
  if($_SESSION['follows'] == null) {
    $_SESSION['follows'] = serialize(array());
  }
  // $_SESSION['follows'] = serialize(array("321", "123"));

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
