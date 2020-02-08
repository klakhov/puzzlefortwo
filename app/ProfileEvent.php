<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Barryvdh\Debugbar\Facade as Debugbar;
class ProfileEvent extends MethodModel
{

    protected $fillable=['user_id','type','options'];

    protected $casts=[
        'options'=>'array',
    ];

    public function getCreatedAtAttribute($value)
    {
        $date = Carbon::parse($value);
        return $date->format('h:i d.m.Y');
    }


    public function user()
    {
       return $this->belongsTo(User::class);
    }

    public static function eventsByUserId($id)
    {
        return ProfileEvent::where('user_id','=',$id)->get();
    }
    public static function createSentRequest($user,$to,$status)
    {
        return ProfileEvent::create([
            'user_id'=>$user->id,
            'type'=>'friend_request',
            'options'=>[
                'status'=>$status,
                'mode'=>'sent',
                'to'=>$to->name,
            ]
        ]);
    }

    public static function createReceivedRequest($user,$to,$status)
    {
        return ProfileEvent::create([
            'user_id'=>$user->id,
            'type'=>'friend_request',
            'options'=>[
                'status'=>$status,
                'mode'=>'received',
                'to'=>$to->name,
            ]
        ]);
    }

    public function close()
    {
        $options = $this->options;
        $options['status'] = 'closed';
        $this->options = $options;
        $this->save();
        return true;
    }
}
