<?php

namespace App\Http\Controllers;


use App\Room;
use App\User;
use Illuminate\Http\Request;

class PuzzleController extends Controller
{
    public function show($uid){
        $room = Room::uid($uid);
        $user_1 = User::find($room->user_id);
        $user_2 = User::find($room->user_second_id);
        return view('puzzle.puzzle', compact('user_1', 'user_2'));
    }
}
