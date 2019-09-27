<?php


$follows = unserialize($_SESSION["follows"]);

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
  echo $str;
}
