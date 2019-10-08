<link rel="stylesheet" href="../../patterns/puzzle/puzzle_game-room/puzzle_game-room.css">
<link rel="stylesheet" href="../../service/apps/popmenu/popmenu.css">
<div class="gamefolder">
  <div class="player1">
    <span id="player1-nick" class="nick-span"><?=$room->user1?></span>
    <span id="player1-stats"class="stats-span">stats 1</span>
  </div>

  <link rel="stylesheet" href="../../patterns/puzzle/puzzle_game-room/canvas.css">
  <div class="puzzle">
    <canvas id="canvas-puzzle" width="1920" height="1280" class="canvas-puzzle"></canvas>
  </div>


  <div class="player2">
    <span id="player2-nick" class="nick-span"><?=$room->user2?></span>
    <span id="player2-stats"class="stats-span">stats 2</span>
  </div>
</div>
<?php if(($login != $room->user1) && ($room->checkStatus()!='playing')){?>
  <div class="quick-settings-unhideble" id="quick-settings-unhideble">
      <header>Ожидание</header>
      <span class="modal-message" id="modal-message">Ожидание игрока <?=$room->user1?></span>
      <span class="timer" id="timer"></span>
  </div>
  <div class="settings-back-unhideble closed-settings-back"></div>
<?php }else{ ?>
  <div class="quick-settings">
      <header>Выход</header>
      <span class="modal-message" id="modal-message">Вы уверены что хотите покинуть
        комнату и оставить друга один на один с пазлом?</span>
      <div class="row justify-content-center mt-5">
        <button class="col-3" id="user-room-exit">Да!</button>
      </div>
  </div>
  <div class="settings-back closed-settings-back"></div>
<?php } ?>
<script type="text/javascript" src="../../service/apps/room/room-accept-waiting.js"></script>
<script type="text/javascript" src="../../patterns/puzzle/puzzle_game-room/room-close-warning.js"></script>

<script type="text/javascript" src="../../service/apps/canvas/sockets-js/socket-creator.js"></script>
<script type="text/javascript" src="../../service/apps/canvas/sockets-js/socket-additional-functions.js"></script>
<script type="text/javascript" src="../../service/classes/Fragment.js"></script>
<script type="text/javascript" src="../../service/apps/canvas/sockets-js/fragment-logic-constants.js"></script>
<script type="text/javascript" src="../../service/apps/canvas/sockets-js/fragment-logic.js"></script>
<script type="text/javascript" src="../../service/apps/canvas/sockets-js/socket-methods.js"></script>
