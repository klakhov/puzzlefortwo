<?php
session_start();
$login = $_SESSION['login'];

include '../connect/connections.php';

$time = time()-300;

$query = "SELECT * FROM rooms WHERE user1='$login' AND user2 <> 'not-set'";
$result = $connect->query($query);

if($result){
  $row = mysqli_fetch_row($result);
  $data = array('success' =>'roomFull' , 'playerNumber'=> 1, 'imagePlaying'=>$row[4], 'opponentNick'=>$row[2]);

}else{
  $data = array('success' => 'roomEmpty' );
}
$data = json_encode($data);
echo $data;
?>
