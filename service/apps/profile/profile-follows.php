<?php

session_start();
$follows = unserialize($_SESSION["follows"]);

$friends = array();
foreach ($follows as $person) {
  $str = "
  <div class=\"friend-main\">
      <div class=\"friend-image\"></div>
      <div class=\"friend-other\">
          <div class=\"friend-name\">
              $person
          </div>
          <div class=\"friend-description\">
              Я рожден чтобы создать модальное окно..
          </div>
      </div>
  </div>";
  $frineds[] = $str;
}
  $data = array();
  $data["response"] = $frineds;
  $data = json_encode($data);
  echo $data;

 ?>
