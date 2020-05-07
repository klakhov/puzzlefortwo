<?php

namespace App;

use App\User;
use DateTime;

class Room extends MethodModel
{
    protected $fillable = [
        'user_id', 'user_1', 'user_2', 'status',
        'timestamp_created','img','description',
        'uid','timestamp_close','timestamp_started'
    ];

    public static $data = [
        'delay' => 300,
        'short_delay' => 5,
    ];

    public static function uid($uid){
        return Room::where('uid', '=', $uid)->first();
    }

    public static function waiting()
    {
        return Room::where('status', '=', 'waiting')->get();
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

    public function startTimer()
    {
        $this->timestamp_started = time();
        $this->save();
    }

    public function timePassed()
    {
        return time() - $this->timestamp_started;
    }

    public function chatHistory()
    {
        return $this->hasOne('App\ChatHistory');
    }
}
