<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use App\Room;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token','avatars','status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'avatars'=>'array'
    ];

    public static function api($api){
        return User::where('api_token', '=', $api)->first();
    }

    public static function name($name)
    {
        return User::where('name', '=', $name)->first();
    }


    public function generateToken(){
        $token = Str::random(60);
        $this->api_token = $token;
        $this->save();
    }

    public function rooms(){
        return $this->hasMany('App\Room');
    }

    public function hasActualRoom(){
        $room = $this->rooms()->where('status', '=', 'waiting')->first();
        if($room) return true;
        return false;
    }

    public static function search($name)
    {
        $users = User::all()->filter(function ($user) use ($name){
           return stristr($user->name, $name);
        });
        return $users;
    }

    //friendship that User started (accepted)
    public function friendsOfMine()
    {
        return $this->belongsToMany('App\User','friends','user_id','friend_id')
            ->wherePivot('accepted','=',true)
            ->withPivot('accepted');
    }

    //friendship that user got (accepted)
    public function friendsOf()
    {
        return $this->belongsToMany('App\User','friends','friend_id','user_id')
            ->wherePivot('accepted','=',true)
            ->withPivot('accepted');
    }

    //all friendships(accepted)
    public function friends()
    {
        $this->friends = $this->friendsOfMine->merge($this->friendsOf);
        return $this->friends;
    }

    //users requests (not accepted)w
    public function requestsOfMine()
    {
       return $this->belongsToMany('App\User','friends','user_id','friend_id')
           ->wherePivot('accepted','=',false)
           ->withPivot('accepted');
    }

    //requests to user (not accepted)
    public function requestsOf()
    {
        return $this->belongsToMany('App\User','friends','friend_id','user_id')
            ->wherePivot('accepted','=',false)
            ->withPivot('accepted');
    }

    public function profileEvents()
    {
        return $this->hasMany('App\ProfileEvent');
    }

}
