<link rel="stylesheet" href="../../patterns/puzzle/left_menu_switcher.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_rooms/room.css">
<link rel="stylesheet" href="../../service/apps/popmenu/popmenu.css">
<div class="left_menu_switcher hidden">
  <div class="room-folder">
    <ul class="room-menu-switcher">
      <li class="room-menu-switcher-li room-menu-switcher-li-active">Список комнат</li>
      <li class="room-menu-switcher-li">Создать комнату</li>
    </ul>
    <div class="room-switcher room-list" id="room-list"></div>
    <form class="room-switcher room-create hidden" action="../../service/apps/room/room-create.php" method="post">
        <span class="room-create-header">Создайте свою комнату</span>
        <input class="room-create-desctiption" type="text" name="desctiption" value="" placeholder="Описание комнаты" maxlength="100"
        required id="room-create-desctiption" autocomplete="off">
        <select class="room-create-img" name="img-name" id="room-create-img" required>
          <option value="img-1">img-1</option>
          <option value="img-2">img-2</option>
          <option value="img-3">img-3</option>
        </select>
        <button class="room-create-submit" type="button" name="button" id="room-create-submit">Создать</button>
    </form>
    <form class="room" style="display:none" id="room" method="post" action="../../pages/game-room/game-room.php">
      <span class="room-span room-nick-1" id="room-nick-1">Nick-1</span>
      <span class="room-span room-desctiption" id="room-desctiption">Desctiption</span>
      <button class="room-span room-join" id="room-join" type="submit">Присоединиться</button>
      <span class="room-span room-img" id="room-img">img-1</span>
      <input type="hidden" name="room-uid" value="" id="room-uid">
    </form>
  </div>

  <div class="settings-back closed-settings-back"></div>
  <div class="quick-settings">
      <header>Получено подтверждение</header>
      <span class="modal-message" id="modal-message"></span>
  </div>
  <div class="settings-back closed-settings-back"></div>

  <div class="quick-settings-unhideble">
      <header>Получено подтверждение</header>
      <span class="modal-message" id="modal-message-unhideble"></span>
      <span class="timer" id="timer-unhideble"></span>
      <form style="display:none" method="post" action="../../pages/game-room/game-room.php" id="second-player-accept">
        <input type="hidden" name="room-uid" value="" id="room-uid">
      </form>
      <button class="modal-accept-room-join" id="modal-accept-room-join" type="submit" form="second-player-accept">Приступить к игре</button>
  </div>
  <div class="settings-back-unhideble closed-settings-back"></div>

</div>
<script type="text/javascript" src="../../patterns/puzzle/puzzle_rooms/room_switcher.js"></script>
<script type="text/javascript" src="../../service/apps/room/room-view.js"></script>
<script type="text/javascript" src="../../service/apps/room/room-create.js"></script>
<script type="text/javascript" src="../../service/apps/popmenu/popmenu.js"></script>
<script type="text/javascript" src="../../service/apps/room/room-join-vaiting.js"></script>
