<?php session_start(); ?>
<!DOCTYPE html>
<?php include '../../service/apps/allimports/allimports.php'; ?>
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
