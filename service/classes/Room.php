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

  function __construct($uid)
  {
    $this->uid = $uid;
  }

  public function create($login,$time,$image,$description)
  {
    include '../connect/connections.php';

    $query = "INSERT INTO `rooms` (user1, user2, timestep, image, description,uid,status)
    VALUES('$login','not-set','$time','$image','$description','$this->uid','waiting')";
    $connect->query($query);
  }
  public function construct()
  {
    include '../connect/connections.php';

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
}

?>
