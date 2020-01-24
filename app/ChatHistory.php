<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatHistory extends Model
{
    protected $fillable=['room_id', "messages"];

    public function room()
    {
        return $this->belongsTo('App\Room');
    }
}
