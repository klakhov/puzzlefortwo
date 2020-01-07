@extends('layouts.app')
@section('content')

    <h1 id="caption-h1">Play with friend</h1>
    <canvas id="canvas-puzzle" width="2370" height="1080">
        <!-- <canvas id="canvas-puzzle" width="1920" height="1080"> -->
    </canvas>

    <script src="/js/puzzle/js/vars.js" defer type="application/javascript"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/base/Component.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/BlankField.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/Field.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/Canvas.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/Panel.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/places/PanelPlace.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/PanelButton.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/Menu.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/places/MenuPlace.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/FragmentGroup.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/Fragment.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/FragmentList.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/Broadcaster.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/classes/PuzzleWorker.js"></script>


    <script type="application/javascript" src="/js/puzzle/js/sockets.js"></script>
    <script type="application/javascript" src="/js/puzzle/js/script.js"></script>

@endsection
