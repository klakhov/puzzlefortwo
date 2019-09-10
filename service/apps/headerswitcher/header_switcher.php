<?php
if($_COOKIE['logged']=="yes"){
  include '../../patterns/headers/header_logged.php';
}else{
  include '../../patterns/headers/header_unlogged.php';
}
?>
