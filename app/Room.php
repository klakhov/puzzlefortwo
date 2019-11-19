<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Room extends Model
{
    protected $fillable = [
        'user_id', 'user_1', 'user_2', 'status',
        'timestamp_created','img','description',
        'uid','timestamp_close',
    ];

    public static function uid($uid){
        return Room::where('uid', '=', $uid)->first();
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function acceptBy(User $user){
        $this->user_2 = $user->name;
        $this->user_second_id = $user->id;
        $this->status = 'accepted';
        $this->save();
        return true;
    }
}
