<?php session_start(); ?>
<!DOCTYPE html>
<script type="text/javascript" src="../../service/impo/jquery-3.4.1.min.js"></script>
<html lang="en" dir="ltr">
  <?php include_once '../html_patterns/meta.html'; ?>
  <link rel="stylesheet" href="puzzle.css">
<body style="margin:0;" class="scroll-defender">
  <?php include_once '../../service/apps/headerswitcher/header_switcher.php'; ?>
  <?php include '../../patterns/sliders/left_menu.php';?>

  <div class="puzzle-content-holder" >
    <?php include '../../patterns/puzzle/puzzle_profile/puzzle_profile.php'; ?>
    <?php include '../../patterns/puzzle/puzzle_rooms/puzzle_rooms.php'; ?>
  </div>
</body>
</html>

<script type="text/javascript" src="../../patterns/sliders/left_menu_switcher.js"></script>
<script type="text/javascript">
  var active = document.getElementsByClassName('header-links');
  active[1].classList.add('header-li-active');
</script>
