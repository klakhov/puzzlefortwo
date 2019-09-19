<?php session_start(); ?>
<!DOCTYPE html>
<?php include '../../service/apps/allimports/allimports.php'; ?>
<html lang="en" dir="ltr">
    <?php include_once '../html_patterns/meta.html'; ?>

<body style="margin:0">
  <?php include_once '../../service/apps/headerswitcher/header_switcher.php'; ?>
  <?php include '../../service/classes/Room.php'; ?>
  <?php
    $login = $_SESSION['login'];
    $uid = $_POST['room-uid'];
    $room = new Room($uid);
    $room->construct();
    if($room->user1 != $login){
      $room->updateStatus($login);
    };
  ?>
  <?php include '../../patterns/puzzle/puzzle_game-room/puzzle_game-room.php'; ?>
</body>
</html>
