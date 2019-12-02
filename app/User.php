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
        'name', 'email', 'password', 'api_token',
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
    ];

    public static function api($api){
        return User::where('api_token', '=', $api)->first();
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
        if($room){
            return true;
        }
        return false;
    }

}
