<!DOCTYPE html>
<html lang="en" dir="ltr">
    <?php include_once '../html_patterns/meta.html'; ?>

<body style="margin:0">
  <link rel="stylesheet" href="entrance.css">
  <?php include_once '../../patterns/headers/header_unlogged/header_unlogged.php'; ?>

  <div class="entrance-forms">
    <div class="super-hed">Вход/регистрация</div>
    <form class="login" action="index.html" method="post">
      <span class="top-spans">Вход</span>
      <input type="text" name="" value="" class="form-input" placeholder="Логин"><br>
      <input type="text" name="" value="" class="form-input" placeholder="Пароль">
      <button type="button" name="button" class="entrance-submit">Войти</button>
    </form>
    <form class="register" action="index.html" method="post">
      <span class="top-spans">Регистрация</span>
      <input type="text" name="" value="" class="form-input" placeholder="Логин"><br>
      <input type="text" name="" value="" class="form-input" placeholder="Пароль"><br>
      <input type="text" name="" value="" class="form-input" placeholder="email">
      <button type="button" name="button" class="entrance-submit" style="  margin-left: 3%;">Зарегистрироваться</button>
    </form>
  </div>
</body>

</html>
<script type="text/javascript" src="../../service/impo/jquery-3.4.1.min.js">
</script>
