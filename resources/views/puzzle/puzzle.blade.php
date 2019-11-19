@extends('layouts.app')
@section('content')
        <puzzle v-bind:user_1="{{$user_1}}" v-bind:user_2="{{$user_2}}"></puzzle>
@endsection
