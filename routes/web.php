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

Route::get('/puzzle/chat/room/{uid}','RoomChatController@index')->middleware('auth');
Route::patch('/puzzle/chat/room','RoomChatController@update')->middleware('auth');
Route::put('/puzzle/chat/room','RoomChatController@read')->middleware('auth');

Route::get('/edit/{name}', 'UserController@showEdit')->middleware('can_edit');
Route::post('/edit/{name}','UserController@edit')->middleware('can_edit');

Route::middleware(['auth'])->group(function(){
    Route::get('/profile/search/{name}','UserController@search');
    Route::get('/profile/info/{name}','UserController@profile');

    Route::get('/profile/friends/{name}','UserController@userWithFriends');
    Route::post('/profile/friends','UserController@addFriend');
    Route::patch('/profile/friends','UserController@acceptFriend');
    Route::delete('/profile/friends/{name}','UserController@refuseFriend');
});

