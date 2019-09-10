<?php
$connect = mysqli_connect("localhost","root","","puzzles");
if(!$connect){
  echo "An error acured due database connect";
  die;
}
?>
