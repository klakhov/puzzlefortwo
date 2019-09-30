<?php

/**
 *
 */
class User
{
  public $login;
  public $email;
  public $id;
  public $status;
  public $follows;
  public $role;


  function __construct($nick)
  {
    $this->login = $nick;
  }


  public function setUpUser()
  {
    include '../connect/connections.php';
    $query = "SELECT * FROM users WHERE nick='$this->login'";
    $result = $connect->query($query);
    $row = mysqli_fetch_row($result);
    $this->id = $row[0];
    $this->login = $row[1];
    // $this->password = $row[2];
    $this->email = $row[3];
    $this->status = $row[4];
    $this->follows = $row[5];
  }

  public function getUserData()
  {
    $data = array();
    $data["id"] = $this->id;
    $data["login"] = $this->login;
    $data["email"] = $this->email;
    $data["status"] = $this->status;
    $data["follows"] = $this->follows;
    return $data;
  }
}

?>
