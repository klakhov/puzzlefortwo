<?php

namespace App\Http\Controllers;

use App\Events\NewProfileEvent;
use App\User;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    public function showEdit()
    {
        return view('pages.profile_edit');
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        if($request->hasFile('avatar')){
            $avatar_path = '/uploads/avatars/';
            $avatar = $request->file('avatar');
            $main_avatar_name = Str::random(10).'.'.$avatar->getClientOriginalExtension();
            $sub_avatar_name = Str::random(10).'.'.$avatar->getClientOriginalExtension();
            Image::make($avatar)->fit(170,280)->save(public_path($avatar_path.$main_avatar_name));
            Image::make($avatar)->fit(65,65)->save(public_path($avatar_path.$sub_avatar_name));
            $user->avatars = [
                'main'=>$avatar_path.$main_avatar_name,
                'sub'=>$avatar_path.$sub_avatar_name,
            ];
        }
        $user->status = $request->status;
        $user->save();
        return view('pages.play');
    }

    public function search($name)
    {
        $users = User::search($name)->take(3);
        if($users->isEmpty()) return response()->json(404);
        return response()->json($users);
    }

    public function profile($name)
    {
        $user = User::name($name);
        $user->friends();
        $user->profileEvents;
        return response()->json($user);
    }

    public function addFriend(Request $request)
    {
        $user = Auth::user();
        $friend = User::name($request->name);
        event(new NewProfileEvent('friend_request', [
            'user'=>$user,
            'friend'=>$friend,
             'status'=>'waiting',
        ]));
        $user->friendsOfMine()->attach($friend->id);
    }

    public function acceptFriend(Request $request)
    {
        $user = Auth::user();
        $friend=User::name($request->name);
        DB::table('friends')
            ->where([['user_id','=',$friend->id],['friend_id','=',$user->id]])
            ->update(['accepted'=>true]);
        event(new NewProfileEvent('friend_request', [
            'user'=>$user,
            'friend'=>$friend,
            'status'=>'accepted',
        ]));
        return response()->json();
    }

    public function refuseFriend($name)
    {
        $user = Auth::user();
        $friend = User::name($name);
        DB::table('friends')
            ->where([['user_id','=',$friend->id],['friend_id','=',$user->id]])
            ->delete();
        DB::table('friends')
            ->where([['user_id','=',$user->id],['friend_id','=',$friend->id]])
            ->delete();
        event(new NewProfileEvent('friend_request', [
            'user'=>$user,
            'friend'=>$friend,
            'status'=>'refused',
        ]));
        return response()->json();
    }

    public function userWithFriends($name)
    {
        $user = User::name($name);
        $user->friends();
        return response()->json($user);
    }

    public function userWithEvents($name)
    {
        $user = User::name($name);
        $user->profileEvents();
        return response()->json($user);
    }
}
