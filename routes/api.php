<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::get('rooms', 'RoomController@index');
    Route::post('rooms','RoomController@store');
    Route::put('rooms','RoomController@update_initial');
    Route::patch('rooms', 'RoomController@update_definitive');

    Route::patch('puzzle','PuzzleController@update');
});
