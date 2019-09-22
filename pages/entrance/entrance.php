<?php session_start() ?>
<!DOCTYPE html>
<?php include '../../service/apps/allimports/allimports.php'; ?>
<html lang="en" dir="ltr">
  <?php include_once '../html_patterns/meta.html'; ?>

<body style="margin:0">
  <link rel="stylesheet" href="entrance.css">
  <?php include_once '../../service/apps/headerswitcher/header_switcher.php'; ?>

  <div class="entrance-forms">
    <div class="super-hed"></div>
    <form class="login" id="login"  action="../../service/apps/entrance/login.php" method="post">
      <span class="top-spans">Вход</span>
      <input type="text" name="" value="" class="form-input" placeholder="Логин" autocomplete="off" min="3" maxlength="11"
      id="login-login-text">
      <input type="password" name="" value="" class="form-input" placeholder="Пароль" autocomplete="off" min="6" maxlength="10"
      id="login-password-text">
      <button type="button" name="button" class="entrance-submit" id="login-submit">Войти</button>
      <div class="error-type" id="login-error-type">Логин уже занят</div>
      <span class="form-link" id="form-link-login">Создайте учетную запись</span>

    </form>
    <form class="register" id="register">
      <span class="top-spans" style="grid-row:1/2">Регистрация</span>
      <input type="text" name="login" value="" class="form-input" placeholder="Логин" autocomplete="off" min="3" maxlength="11"
      id="register-login-text"  style="grid-row:2/3">
      <input type="password" name="password" value="" class="form-input" placeholder="Пароль" autocomplete="off" min="6" maxlength="10"
      id="register-password-text" style="grid-row:3/4">
      <input type="email" name="email" value="" class="form-input" placeholder="email" id="register-email-text" style="grid-row:4/5">
      <button type="button" name="button" class="entrance-submit" id="register-submit" style="grid-row:5/6; margin-left:19%;">Зарегистрироваться</button>
      <div class="error-type" id="register-error-type">Логин уже занят</div>
      <span class="form-link" id="form-link-register" style="margin-left: 40%;">Вход</span>
    </form>
  </div>
</body>

</html>

<script type="text/javascript" src="entrance_formshow.js"></script>
<script type="text/javascript" src="register.js"></script>
<script type="text/javascript" src="login.js"></script>
