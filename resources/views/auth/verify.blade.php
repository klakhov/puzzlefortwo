@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8 email-verify">
                <div class="row">
                    <div class="verify-header col">Подтвердите ваш E-Mail</div>
                </div>

                <div class="verify-body mt-4">
                    @if (session('resent'))
                        <div class="row">
                            <div class="alert alert-success" role="alert">
                                Новая ссылка была отправлена на ваш E-Mail
                            </div>
                        </div>
                    @endif
                    <div class="verify-text">
                            Перед тем как продолжить, перейдите по ссылке, отправленной на ваш E-Mail.
                            Если вы не получили письмо,

                        <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                            @csrf
                            <button type="submit" class="btn btn-link p-0 m-0 align-baseline verify-text">нажмите сюда, чтобы отправить его снова</button>.
                        </form>
                    </div>
                </div>
        </div>
    </div>
</div>
@endsection
