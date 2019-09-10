<?php session_start(); ?>
<!DOCTYPE html>
<script type="text/javascript" src="../../service/impo/jquery-3.4.1.min.js"></script>
<html lang="en" dir="ltr">
    <?php include_once '../html_patterns/meta.html'; ?>

<body style="margin:0">
  <?php include_once '../../service/apps/headerswitcher/header_switcher.php'; ?>
</body>
</html>

<script type="text/javascript">
  var active = document.querySelector('.header-links:nth-child(1)');
  active.classList.add('header-li-active');
</script>
