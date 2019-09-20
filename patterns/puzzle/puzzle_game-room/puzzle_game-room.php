<link rel="stylesheet" href="../../patterns/puzzle/puzzle_game-room/puzzle_game-room.css">
<link rel="stylesheet" href="../../service/apps/popmenu/popmenu.css">
<div class="gamefolder">
  <div class="player1">
    <span id="player1-nick" class="nick-span"><?=$room->user1?></span>
    <span id="player1-stats"class="stats-span">stats 1</span>
  </div>
  <div class="puzzle">
    <span class="nick-span"><?=$room->image?></span>
  </div>
  <div class="player2">
    <span id="player2-nick" class="nick-span"><?=$room->user2?></span>
    <span id="player2-stats"class="stats-span">stats 2</span>
  </div>
</div>
<div class="quick-settings">
    <header>Ожидание</header>
    <span class="modal-message" id="modal-message">Ожидание игрока <?=$room->user1?></span>
    <span class="timer" id="timer"></span>
</div>
<div class="settings-back closed-settings-back"></div>
<script type="text/javascript">let uid = <? echo "\"$uid\"" ?></script>
<script type="text/javascript" src="../../service/apps/room/room-accept-waiting.js"></script>
