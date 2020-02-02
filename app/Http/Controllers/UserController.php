<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Support\Facades\Auth;
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
        $users = $users->map(function ($user){return $user->name;});
        return response()->json($users);
    }
}
