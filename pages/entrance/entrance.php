<?php session_start() ?>
<!DOCTYPE html>
<script type="text/javascript" src="../../service/impo/jquery-3.4.1.min.js"></script>
<html lang="en" dir="ltr">
  <?php include_once '../html_patterns/meta.html'; ?>

<body style="margin:0">
  <link rel="stylesheet" href="entrance.css">
  <?php include_once '../../service/apps/headerswitcher/header_switcher.php'; ?>

  <div class="entrance-forms">
    <div class="super-hed"></div>
    <form class="login" id="login"  action="../../service/apps/entrance/login.php" method="post">
      <span class="top-spans">Вход</span>
      <input type="text" name="" value="" class="form-input" placeholder="Логин" autocomplete="off" min="3" maxlength="10"
      id="login-login-text"><br>
      <input type="password" name="" value="" class="form-input" placeholder="Пароль" autocomplete="off" min="6" maxlength="10"
      id="login-password-text">
      <button type="button" name="button" class="entrance-submit" id="login-submit">Войти</button>
      <div class="error-type" id="login-error-type">Логин уже занят</div>
      <span class="form-link" id="form-link-login">Создайте учетную запись</span>

    </form>
    <form class="register" id="register">
      <span class="top-spans">Регистрация</span>
      <input type="text" name="login" value="" class="form-input" placeholder="Логин" autocomplete="off" min="3" maxlength="10"
      id="register-login-text"><br>
      <input type="password" name="password" value="" class="form-input" placeholder="Пароль" autocomplete="off" min="6" maxlength="10"
      id="register-password-text"><br>
      <input type="email" name="email" value="" class="form-input" placeholder="email" id="register-email-text">
      <button type="button" name="button" class="entrance-submit" style="margin-left: 5%" id="register-submit">Зарегистрироваться</button>
      <div class="error-type" id="register-error-type">Логин уже занят</div>
      <span class="form-link" id="form-link-register" style="margin-left: 10%;">Вход</span>
    </form>
  </div>
</body>

</html>

<script type="text/javascript" src="entrance_formshow.js"></script>
<script type="text/javascript" src="register.js"></script>
<script type="text/javascript" src="login.js"></script>
