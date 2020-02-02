@extends('layouts.app')
@section('content')
    @if(Auth::check())
        <profile :user="{{Auth::user()}}"></profile>
        <room-list v-bind:user_info="{{Auth::user()}}"></room-list>
        <profile-slider></profile-slider>
    @else
        <div class="row">
            <div class="col bg-primary text-center">U need to log in</div>
        </div>
    @endif
@endsection
