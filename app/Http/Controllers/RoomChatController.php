<?php

namespace App\Http\Controllers;


use App\Room;
use App\User;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Events\RoomChatNewMessage;

class RoomChatController extends Controller
{
    public function index($uid)
    {
        return response()->json(Room::uid($uid)->chatHistory->messages);
    }

    public function update(Request $request)
    {
        $message = $request->message;
        $room = Room::uid($request->uid);
        $story = $room->chatHistory;
        $messages = json_decode($story->messages);
        $messages[] = $message;
        $story->messages = $messages;
        $story->save();
        event(new RoomChatNewMessage($message,$room->uid));
        return response()->json($message);
    }

    public function read(Request $request)
    {
        $room = Room::uid($request->uid);
        $story = $room->chatHistory;
        $id = $request->user_id;
        $messages = json_decode($story->messages);
        foreach ($messages as $message){
            if(!in_array($id,$message->readBy)) {
                $message->readBy[] = $id;
            }
        }
        $story->messages = $messages;
        $story->save();
    }
}
