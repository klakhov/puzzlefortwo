@extends('layouts.app')
@section('content')
    <room-chat :user="{{Auth::user()}}"></room-chat>
    <puzzle/>
@endsection
