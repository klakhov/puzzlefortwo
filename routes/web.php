<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;


Auth::routes(['verify'=> true]);

Route::get('/', 'PagesController@home');
Route::get('/about','PagesController@about');
Route::get('/play','PagesController@play')->middleware('auth');

Route::get('/puzzle/{uid}', 'PuzzleController@show')->middleware('auth');
Route::get('/puzzle/info/room/{uid}','PuzzleController@info')->middleware('auth');
Route::get('/puzzle/info/time/{uid}','PuzzleController@time')->middleware('auth');
