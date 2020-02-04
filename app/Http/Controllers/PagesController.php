<?php

namespace App\Http\Controllers;



use App\Room;
use App\User;
use Illuminate\Support\Facades\Auth;

class PagesController extends Controller
{
    public function play()
    {
        $user = User::with( 'profileEvents')->find(Auth::id());
        $user->friends();
        return view('pages.play', compact('user'));
    }

    public function home()
    {
        return view('pages.home');
    }

    public function about()
    {
        return view('pages.about');
    }

    public function test()
    {
        return view('auth.verify');
    }
}
