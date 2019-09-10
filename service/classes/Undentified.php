<?php
/**
 *
 */
 class Undentified
 {
   public $login;
   public $password;
   public $email;

   function __construct($l,$p,$e="test-test")
   {
     $this->login = $l;
     $this->password = $p;
     $this->email = $e;
   }

   public function loginExists()
   {
     include '../../apps/connect/connections.php';
     $query = "SELECT * FROM users WHERE nick='$this->login'";
     $result = $connect->query($query);
     if($result->fetch_assoc() == null){
       return false;
     }else{
       return true;
     }
   }
   public function emailExists()
   {
     include '../../apps/connect/connections.php';
     $query = "SELECT * FROM users WHERE email='$this->email'";
     $result = $connect->query($query);
     if($result->fetch_assoc() == null){
       return false;
     }else{
       return true;
     }
   }


   public function create()
   {
     include '../../apps/connect/connections.php';
     $query = "INSERT INTO `users` (nick, password, email, status)
     VALUES('$this->login','$this->password','$this->email','offline')";
     $connect->query($query);
   }


   public function userVerify(){
     include '../connect/connections.php';
     $query = "SELECT * FROM users WHERE nick='$this->login'";
     $result = $connect->query($query);
     $rows = mysqli_num_rows($result);
     if($rows == 0){
       return false;
     }else{
       $row = mysqli_fetch_row($result);
       $pas= $row[2];
       if(password_verify($this->password,$pas)){
         return true;
       }else{
         return false;
       };
     };
   }

 }

?>
