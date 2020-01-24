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
        return view('puzzle.puzzle', compact('user_1', 'user_2', 'room'));
    }

    public function update(Request $request)
    {
        return response()->json('hello');
    }

    public function info($uid)
    {
        return response()->json(Room::uid($uid));
    }

    public function time($uid)
    {
        return response()->json(Room::uid($uid)->timePassed());
    }

    public function chatHistory($uid)
    {
        return response()->json(Room::uid($uid)->chatHistory());
    }
}
