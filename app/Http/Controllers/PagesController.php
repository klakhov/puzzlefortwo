<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function play(){
        return view('pages.play');
    }

    public function home(){
        return view('pages.home');
    }

    public function about(){
        return view('pages.about');
    }
}
