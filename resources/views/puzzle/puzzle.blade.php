@extends('layouts.app')
@section('content')


    <canvas id="canvas-puzzle" width="2370" height="1080">
        <!-- <canvas id="canvas-puzzle" width="1920" height="1080"> -->
    </canvas>
    <link rel="stylesheet" href="/js/puzzle/css/puzzle.css">
    <script src="/js/puzzle/js/vars.js" defer type="application/javascript"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/base/Component.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/BlankField.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/Field.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/Canvas.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/Panel.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/places/PanelPlace.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/PanelButton.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/Menu.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/places/MenuPlace.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/FragmentGroup.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/Fragment.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/main/FragmentList.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/sockets/Broadcaster.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/sockets/PuzzleWorker.js"></script>

    <script type="application/javascript" src="/js/puzzle/js/classes/utility/Timer.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/sockets.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/script.js"></script>

    <room-chat :user="{{Auth::user()}}"></room-chat>

@endsection
