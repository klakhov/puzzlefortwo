<?php

namespace App\Http\Controllers;

use App\ChatHistory;
use App\Events\AcceptRoom;
use App\Events\NewRoom;
use App\Jobs\CloseRoom;
use App\Room;
use Barryvdh\Debugbar\Facade as Debugbar;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Str;

class RoomController extends Controller
{
    public function store(Request $request){
        $user =User::api($request->api_token);
        if(!($user->hasActualRoom())){
            $room = Room::create([
                'user_id'=>$user->id,
                'user_1'=>$user->name,
                'user_2'=>'not_set',
                'status'=>'waiting',
                'timestamp_created'=>time(),
                'img'=>$request->image,
                'description'=>$request->description,
                'uid'=>Str::random(45),
                'timestamp_close'=>time()+Room::$data['delay'],
            ]);
            ChatHistory::create([ //initialise chat with room messages are nullable(obvious)
               'room_id'=>$room->id,
            ]);
            dispatch((new CloseRoom($room))->delay(Room::$data['delay']));//job to close room
            event(new NewRoom($room));//everyone should know that room was created
            return response()->json($room);
        }else{
           return response()->json('User has actual room');
        }
    }

    public function index(){
        $rooms = Room::waiting();
        return response()->json($rooms);
    }

    public function update_initial(Request $request){
        $user = User::api($request->api_token);
        $room = Room::uid($request->uid);
        $room->acceptBy($user);
        event(new AcceptRoom($room, 'initial'));
        return response()->json($room);
    }

    public function update_definitive(Request $request){
        $room = Room::uid($request->uid);
        $room->startTimer();
        event(new AcceptRoom($room, 'definitive'));
        return response()->json('definitive accept');
    }

    public function destroy(Request $request)
    {
        DebugBar::info($request);
        $room = Room::uid($request->uid);
        dispatch((new CloseRoom($room))->delay(Room::$data['short_delay']));//job to close room
    }


}
