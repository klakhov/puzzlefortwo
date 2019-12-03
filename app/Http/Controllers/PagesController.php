<?php

namespace App\Http\Controllers;



use App\Room;

class PagesController extends Controller
{
    public function play()
    {
        return view('pages.play');
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
