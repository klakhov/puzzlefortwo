<?php
$connect = mysqli_connect("localhost","root","","puzzles");
// $connect = mysqli_connect("localhost","id10780440_contributor1","1234567890qwerty","id10780440_puzzles");
if(!$connect){
  echo "An error acured due database connect";
  die;
}
?>
