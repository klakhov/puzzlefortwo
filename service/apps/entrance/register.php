<?php
include_once '../../classes/Udentified.php';
$login = $_POST['login'];
$password = $_POST['password'];
$email = $_POST['email'];

$password = password_hash($password,PASSWORD_DEFAULT);
$user = new Udentified($login,$password,$email);

$response = array();
if($user->loginExists()){
  $response["result"] = "LoginExists";
}elseif ($user->emailExists()) {
  $response["result"] = "EmailExists";
}else{
  $user->create();
  $response["result"] = "UserCreated";
}
$response = json_encode($response);
echo $response;

?>
