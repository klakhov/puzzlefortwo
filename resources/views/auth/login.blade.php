@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <div class="row justify-content-center mt-5">
            <div class="card login-card col-md-8 w-75">
                <div class="row">
                    <div class="col login-header mt-3">{{ __('Вход') }}</div>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row justify-content-center">

                            <div class="col-md-5">
                                <input id="email" type="email" class="form-control login-input @error('email') is-invalid @enderror"
                                       name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                                        placeholder="E-mail">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row justify-content-center">


                            <div class="col-md-5">
                                <input id="password" type="password" class="form-control login-input @error('password') is-invalid @enderror"
                                       name="password" required autocomplete="current-password"
                                        placeholder="Пароль">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group row mb-0 justify-content-center">
                            <button type="submit" class="entrance-button mt-3">
                                {{ __('Вход') }}
                            </button>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <div class="col">
                        <a href="/register" class="login-to-link">Создайте учетную запись</a>
                    </div>
                </div>
            </div>
        </div>
</div>
@endsection
