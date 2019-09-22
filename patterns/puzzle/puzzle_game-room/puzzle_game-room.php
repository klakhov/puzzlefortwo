<link rel="stylesheet" href="../../patterns/puzzle/puzzle_game-room/puzzle_game-room.css">
<link rel="stylesheet" href="../../service/apps/popmenu/popmenu.css">
<link rel="stylesheet" href="../../patterns/puzzle/puzzle_game-room/block.css">
<div class="gamefolder">
  <div class="player1">
    <span id="player1-nick" class="nick-span"><?=$room->user1?></span>
    <span id="player1-stats"class="stats-span">stats 1</span>
  </div>


  <link rel="stylesheet" href="../../patterns/puzzle/puzzle_game-room/block.css">
  <div class="puzzle">
    <div class="zone1" id="zone1"></div>
    <div class="zone2" id="zone2"></div>
  </div>
  <div class="block1" draggable="true" id="block1"></div>
  <div class="block2" draggable="true" id="block2"></div>
  <script type="text/javascript" src="../../service/apps/canvas/canvas.js"></script>


  <div class="player2">
    <span id="player2-nick" class="nick-span"><?=$room->user2?></span>
    <span id="player2-stats"class="stats-span">stats 2</span>
  </div>
</div>
<?php if($login != $room->user1){ ?>
  <div class="quick-settings-unhideble">
      <header>Ожидание</header>
      <span class="modal-message" id="modal-message">Ожидание игрока <?=$room->user1?></span>
      <span class="timer" id="timer"></span>
  </div>
  <div class="settings-back-unhideble closed-settings-back"></div>
<?php } ?>

<script type="text/javascript" src="../../service/apps/room/room-accept-waiting.js"></script>
