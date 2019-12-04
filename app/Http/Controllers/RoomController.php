<?php

namespace App\Http\Controllers;

use App\Events\AcceptRoom;
use App\Events\NewRoom;
use App\Jobs\CloseRoom;
use App\Room;
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
                'timestamp_close'=>time()+300,
            ]);
            dispatch((new CloseRoom($room))->delay(Room::$data['delay']));
            event(new NewRoom($room));
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
        event(new AcceptRoom($room, 'definitive'));
        return response()->json('definitive accept');
    }
}
