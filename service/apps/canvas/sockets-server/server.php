<?php
include '../../../classes/SocketConnection.php';
$socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
socket_set_option($socket, SOL_SOCKET,SO_REUSEADDR, 1);
socket_bind($socket, 0, "8090");

socket_listen($socket);
$socketConnection = new SocketConnection();

$clientSocketArray = array($socket);

$fragments = array();

while (true) {
  $newSocketArray = $clientSocketArray;
  $nullA = [];
  socket_select($newSocketArray, $nullA, $nullA, 0, 10);

  if(in_array($socket, $newSocketArray)){
    $newSocket = socket_accept($socket);
    $clientSocketArray[] = $newSocket;

    $header = socket_read($newSocket, 1024);
    $socketConnection->handShake($header, $newSocket);
  }
  foreach ($newSocketArray as $newSocketArrayResource) {
    //обработка входящих
    while (socket_recv($newSocketArrayResource, $socketData, 1024,0) >= 1) {
      $socketMessage = $socketConnection->unseal($socketData);

      $count = count($socketMessage);
      for ($i=0; $i < $count; $i++) {
        $fragments[$i] = $socketMessage[$i];
      };


      $toSend = $socketConnection->seal($fragments);
      $socketConnection->send($toSend, $clientSocketArray);

      break 2;
    }
    //убираем фолы
    $socketData = @socket_read($newSocketArrayResource,1024, PHP_NORMAL_READ);
    if($socketData == false){
        $newSocketArrayIndex = array_search($newSocketArrayResource, $clientSocketArray);
        unset($newSocketArray[$newSocketArrayIndex]);
    }
  }

  }

socket_close($socket);
?>
