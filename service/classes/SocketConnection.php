<?php
class SocketConnection
{
  public function handShake($header, $newSocket)
  {
    $headers = array();
    $tmpLine = preg_split("/\r\n/",$header);

    foreach($tmpLine as $line) {
      $line = rtrim($line);
      if(preg_match("/\A(\S+): (.*)\z/", $line, $matches)) {
        $headers[$matches[1]] = $matches[2];
      }
    }

    $key = $headers['Sec-WebSocket-Key'];

    $key = $key.'258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    $hash = sha1($key, true);
    $sKey = base64_encode($hash);

    $strHeader = "HTTP/1.1 101 Switching Protocols\r\n".
    "Upgrade: websocket\r\n" .
    "Connection: Upgrade\r\n" .
    "Sec-WebSocket-Accept: $sKey\r\n\r\n";

    socket_write($newSocket, $strHeader, strlen($strHeader));
  }

  public function send($message, $clientSocketArray)
  {
    $messageLength = strlen($message);
    foreach ($clientSocketArray as $client) {
      @socket_write($client, $message, $messageLength);
    }

    return true;
  }

  public function seal($message)
  {
    $message = json_encode($message);
    $b1 = 0x81;
    $length = strlen($message);
    $header = "";

    if($length <= 125){
      $header = pack("CC", $b1, $length);
    }elseif ($length > 125 && $length < 65536) {
      $header = pack("CCn", $b1, 126, $length);
    }elseif ($length > 65536) {
      $header = pack("CCNN", $b1, 127, $length);
    }

    return $header.$message;
  }
  public function unseal($socketData)
  {
    $length = ord($socketData[1]) & 127;

    if($length == 126){
      $mask = substr($socketData, 4,4);
      $data = substr($socketData, 8);
    }elseif($length == 127){
      $mask = substr($socketData, 10,4);
      $data = substr($socketData, 14);
    }else{
      $mask = substr($socketData, 2,4);
      $data = substr($socketData, 6);
    }

    $socketStr = "";
    for($i=0;$i< strlen($socketData);$i++){
      $socketStr.= $data[$i]^$mask[$i%4];
    }
    $result = json_decode($socketStr);
    return $result;
  }
}

?>
