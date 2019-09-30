<?php

session_start();
$follows = unserialize($_SESSION["follows"]);

$friends = array();
$ind = 1;
foreach ($follows as $person) {
  $str = "
  <div class=\"friend-main\" id=\"friend-main-$ind\">
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
  $ind++;
  $friends[] = array("div" => $str, "name" => $person);
}
  $data = array();
  $data["response"] = $friends;
  $data = json_encode($data);
  echo $data;

 ?>
