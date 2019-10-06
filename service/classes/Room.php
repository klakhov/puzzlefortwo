<?php include 'SocketConnection.php'; ?>
<?php
class Room extends SocketConnection
{

  public $id;
  public $user1;
  public $user2;
  public $timestep;
  public $image;
  public $description;
  public $uid;
  public $status;
  public $timestep_accept;

  public $block1;
  public $block2;

  function __construct($uid)
  {
    $this->uid = $uid;
  }

  public function create($login,$time,$image,$description)
  {
    if(file_exists('../../service/apps/connect/connections.php')){
      include '../../service/apps/connect/connections.php';
    }else{
      include '../connect/connections.php';
    };
    $block1 = array('top' => '300px', 'left' => '600px');
    $block2 = array('top' => '300px', 'left' => '1100px');

    $block1 = serialize($block1);
    $block2 = serialize($block2);

    $query = "INSERT INTO `rooms` (user1, user2, timestep, image, description,
      uid,status,timestep_accept, block1, block2)
    VALUES('$login','not-set','$time','$image','$description','$this->uid',
      'lobby',0, '$block1','$block2')";
    $connect->query($query);
  }
  public function constructByUid()
  {
    if(file_exists('../../service/apps/connect/connections.php')){
      include '../../service/apps/connect/connections.php';
    }else{
      include '../connect/connections.php';
    };
    $query = "SELECT * FROM rooms WHERE uid='$this->uid'";
    $result = $connect->query($query);

    $row = mysqli_fetch_row($result);

    $this->id = $row[0];
    $this->user1 = $row[1];
    $this->user2 = $row[2];
    $this->timestep = $row[3];
    $this->image = $row[4];
    $this->description = $row[5];
    $this->status = $row[7];
    $this->timestep_accept = $row[8];

    $this->block1 = unserialize($row[9]);
    $this->block2 = unserialize($row[10]);
  }
  public function updateStatusToWaiting($user2)
  {
    if(file_exists('../../service/apps/connect/connections.php')){
      include '../../service/apps/connect/connections.php';
    }else{
      include '../connect/connections.php';
    };

    $time = time();

    $this->user2 = $user2;

    $query = "UPDATE rooms
    SET user2='$user2', status='waiting', timestep_accept='$time'
    WHERE uid='$this->uid'";
    $connect->query($query);
  }
  public function checkStatus()
  {
    if(file_exists('../../service/apps/connect/connections.php')){
      include '../../service/apps/connect/connections.php';
    }else{
      include '../connect/connections.php';
    };
    $query = "SELECT * FROM rooms WHERE uid='$this->uid'";
    $result = $connect->query($query);
    $row = mysqli_fetch_row($result);
    return $row[7];
  }
  public function updateStatusToPlaying()
  {
    if(file_exists('../../service/apps/connect/connections.php')){
      include '../../service/apps/connect/connections.php';
    }else{
      include '../connect/connections.php';
    };
    $query = "UPDATE rooms
    SET status='playing'
    WHERE uid='$this->uid'";
    $connect->query($query);
  }
  public function updateStatusToClosed()
  {
    if(file_exists('../../service/apps/connect/connections.php')){
      include '../../service/apps/connect/connections.php';
    }else{
      include '../connect/connections.php';
    };
    $query = "UPDATE rooms
    SET status='closed'
    WHERE uid='$this->uid'";
    $connect->query($query);
  }
}

?>
