<?php
/**
 *
 */
class Room
{

  public $id;
  public $user1;
  public $user2;
  public $timestep;
  public $image;
  public $description;
  public $uid;
  public $status;

  public $test = "hello";

  function __construct($uid)
  {
    $this->uid = $uid;
  }

  public function create($login,$time,$image,$description)
  {
    $iclusion = include '../../service/apps/connect/connections.php';
    if(!$inclusion){
      include '../connect/connections.php';
    }else{
      include '../../service/apps/connect/connections.php';
    }

    $query = "INSERT INTO `rooms` (user1, user2, timestep, image, description,uid,status)
    VALUES('$login','not-set','$time','$image','$description','$this->uid','waiting')";
    $connect->query($query);
  }
  public function construct()
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
  }
  public function updateStatus($login)
  {
    include '../../service/apps/connect/connections.php';

    $query = "UPDATE rooms
    SET user2='$login', status='playing'
    WHERE uid='$this->uid'";
    $connect->query($query);
  }
}

?>
