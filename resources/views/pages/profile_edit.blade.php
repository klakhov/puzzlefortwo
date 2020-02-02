@extends('layouts.app')
@section('content')
    @if(Auth::check())
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">
        <profile-edit :user="{{Auth::user()}}"></profile-edit>
    @endif
@endsection
