<?php
if(isset($_COOKIE['logged'])){
  include '../../patterns/headers/header_logged.php';
}else{
  include '../../patterns/headers/header_unlogged.php';
}
?>
