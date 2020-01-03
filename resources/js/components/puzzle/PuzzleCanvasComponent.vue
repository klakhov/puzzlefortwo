<template>
    <div class="">
        <canvas id="canvas-puzzle" width="3840" height="2160"></canvas>
    </div>
</template>

<script>
    //import Name from 'route'
    import Component from "../../classes/base/Component"
    import Fragment from "../../classes/Fragment";
    import FragmentGroup from "../../classes/FragmentGroup";
    import FragmentList from "../../classes/FragmentList";
    import Broadcaster from '../../classes/Broadcaster';
    import PuzzleWorker from "../../classes/PuzzleWorker";
    import Canvas from "../../classes/Canvas";
    import Field from "../../classes/Field";
    export default {
        props: [
            'room',
        ],
        data: function () {
            return {
                objects: {},
                PuzzleWorker:{},
                workerTasks:[],
            }
        },
        components: {
            //'tag-name':Name
        },
        mounted() {
            const component = this;
            this.objects = {
                globalConstants: {
                    FRAMES: 60,
                    imagesX: 4,
                    imagesY: 4,
                    countImages: 4 * 4,
                    FIELD_WIDTH: 3 / 5, // Размеры поля
                    FIELD_HEIGHT: 9 / 11, // Местоположение поля в Field.js -> (27, 28) строки

                    KEY_showSilhouette: 83, // S
                    DIRECTORY: "../img/puzzle/",
                },
                SelectFragmentHelper : {
                    translatedFragmentId: -1,
                    deltaX: 0,
                    deltaY: 0
                },
                globalVariables: {
                    arr : [],
                    shouldConnect : false,
                    showSilhouette : false,
                    canvas : undefined,
                }
            };
            var arr = component.objects.globalVariables.arr;
            var canvas = component.objects.globalVariables.canvas;
            var SelectFragmentHelper = component.objects.SelectFragmentHelper;
            var globalConstants = component.objects.globalConstants;
            var globalVariables = component.objects.globalVariables;
            var showSilhouette = component.objects.globalVariables.showSilhouette;
            var shouldConnect = component.objects.globalVariables.shouldConnect;
            function drawAll(canvas, context) {
                context.lineWidth = "1";

                context.clearRect(0,
                    0,
                    canvas.canvas.width,
                    canvas.canvas.height
                );
                canvas.panel.drawFragments(context);
                var lastSeenObject = FragmentList.firstVisualObject;
                do {
                    lastSeenObject.value.draw(context);
                    lastSeenObject = lastSeenObject.next;
                } while (lastSeenObject != null)

                canvas.drawBlank(context);
                canvas.draw(context);
            }

            function initializeFragmentList(arr) {
                for (let i = 0; i < globalConstants.countImages; i++) {
                    var x = i % globalConstants.imagesX;
                    var y = Math.floor(i / globalConstants.imagesY);

                    var leftId = i % globalConstants.imagesX - 1;
                    var topId = i - globalConstants.imagesY;

                    arr.push(
                        new Fragment(
                            i,
                            globalConstants.DIRECTORY + (i + 1) + '.png',
                            globalConstants.DIRECTORY + (i + 1) + '_.png',
                            100, 100,
                            (leftId >= 0 ? arr[i - 1] : null), (topId >= 0 ? arr[topId] : null),
                            i,
                            component.objects
                        )
                    );

                    canvas.panel.fragments[i] = i;

                    if (FragmentList.lastVisualObject == null) {
                        FragmentList.lastVisualObject = new FragmentList(arr[arr.length - 1], null);
                        FragmentList.firstVisualObject = FragmentList.lastVisualObject;
                    } else {
                        FragmentList.lastVisualObject = new FragmentList(arr[arr.length - 1], FragmentList.lastVisualObject);
                    }
                }
            }

            function initializeSizes(fragment, img) {
                canvas.field.all_width = canvas.canvas.width * FIELD_WIDTH;
                canvas.field.all_height = canvas.canvas.height * FIELD_HEIGHT;

                fragment.init(img);

                canvas.field.init();
                canvas.panel.init();

                canvas.left_menu.init();
                canvas.right_menu.init();

                canvas.createBlankZones();
            }

            window.onload = function() {

                console.log("Started");
                canvas = new Canvas("canvas-puzzle", component.objects);
                canvas.initElements();
                initializeFragmentList(arr);

                canvas.canvas.onmousemove = function(e) {
                    var loc = canvas.getCoords(e.clientX, e.clientY);
                    if (SelectFragmentHelper.translatedFragmentId >= 0) {
                        if (canvas.isInZones(loc.x, loc.y)) {
                            var newX = loc.x - SelectFragmentHelper.deltaX;
                            var newY = loc.y - SelectFragmentHelper.deltaY;
                            if (arr[SelectFragmentHelper.translatedFragmentId].group == null) {
                                arr[SelectFragmentHelper.translatedFragmentId].move(newX, newY);
                            } else if (arr[SelectFragmentHelper.translatedFragmentId].group != null) {
                                arr[SelectFragmentHelper.translatedFragmentId].group.move(
                                    newX, newY,
                                    arr[SelectFragmentHelper.translatedFragmentId]
                                );
                            }
                        }
                    }

                    canvas.panel.onmousemove(loc.x, loc.y);
                    canvas.left_menu.onmousemove(loc.x, loc.y);
                    canvas.right_menu.onmousemove(loc.x, loc.y);
                };

                canvas.canvas.onmousedown = function(e) {
                    shouldConnect = true;
                    var loc = canvas.getCoords(e.clientX, e.clientY);
                    if (canvas.panel.onmousedown(loc)) {
                        return;
                    }

                    var lastSeenObject = FragmentList.lastVisualObject;
                    do {
                        var value = lastSeenObject.value;
                        var objInCoords = value.isHadPoint(loc.x, loc.y); // у группы или фрагмента
                        if (value instanceof Fragment) {
                            if (objInCoords) {
                                if (!value.smoothing && !value.isConnecting) {
                                    // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
                                    if (value.onBottomPanel) {
                                        value.onBottomPanel = false;
                                        value.moveToPanel();
                                    }
                                    ranges = value.rangeToStartImage(loc.x, loc.y);
                                    SelectFragmentHelper.deltaX = ranges.x;
                                    SelectFragmentHelper.deltaY = ranges.y;
                                    SelectFragmentHelper.translatedFragmentId = value.ind;
                                    lastSeenObject.replaceToTop(); // отображать поверх других объектов
                                    break;
                                }
                            }
                        } else if (value instanceof FragmentGroup) {
                            if (objInCoords > -1) {
                                if (!value.smoothing && !value.isConnecting) {
                                    // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
                                    ranges = arr[objInCoords].rangeToStartImage(loc.x, loc.y);
                                    SelectFragmentHelper.deltaX = ranges.x;
                                    SelectFragmentHelper.deltaY = ranges.y;
                                    SelectFragmentHelper.translatedFragmentId = objInCoords;
                                    lastSeenObject.replaceToTop(); // отображать поверх других объектов
                                    break;
                                }
                            }
                        }
                        lastSeenObject = lastSeenObject.prev;
                    } while (lastSeenObject != null)
                }


                canvas.canvas.onmouseup = function(e) {
                    if (SelectFragmentHelper.translatedFragmentId >= 0) {
                        if (canvas.onMenuZone()) {

                        }

                        var loc = canvas.getCoords(e.clientX, e.clientY);
                        var selectedFragment = arr[SelectFragmentHelper.translatedFragmentId];

                        if (selectedFragment.group != null) {
                            selectedFragment.group.editMenuCoords(selectedFragment);
                        } else {
                            selectedFragment.editMenuCoords();
                        }

                        if (selectedFragment.group == null && canvas.panel.isHadPoint(loc.x, loc.y)) {
                            selectedFragment.onBottomPanel = true;
                        }

                        if (shouldConnect) {
                            FragmentList.lastVisualObject.value.connectTo();
                        }
                        SelectFragmentHelper.translatedFragmentId = -1;
                    }
                }

                document.addEventListener('mousedown', function(event) {
                    // if (lastDownTarget != event.target) {
                    //   showSilhouette = false;
                    // }
                    // lastDownTarget = event.target;
                }, false);

                document.addEventListener('keydown', function(event) {
                    if (event.keyCode == KEY_shouldConnect) {
                        if (shouldConnect)
                            shouldConnect = false;
                        else shouldConnect = true;
                        console.log("shouldConnect is", shouldConnect);
                    }
                    if (event.keyCode == KEY_showSilhouette) {
                        showSilhouette = true;
                    }
                    if (event.keyCode == 49) {
                        var lastSeenObject = FragmentList.lastVisualObject;
                        do {
                            console.log(lastSeenObject);
                            lastSeenObject = lastSeenObject.prev;
                        } while (lastSeenObject != null)
                        console.log("\nEND\n")
                    }

                    if (event.keyCode == 50) {
                        console.log(canvas.blank_zones);
                    }
                }, false);

                document.addEventListener('keyup', function(event) {
                    if (event.keyCode == KEY_showSilhouette) {
                        showSilhouette = false;
                    }
                }, false);

                // Анимация с определённой частотой для обновления экрана
                setInterval(update, 1000 / globalConstants.FRAMES);

            }

// Обновление экрана
            function update() {
                drawAll(canvas, canvas.context);
            }

        },
        methods: {
            listenPuzzleMove: function () {
                let arr = this.arr;
                let channel = Echo.private('room.' + this.room.uid);
                channel.listen('.client-move', (response) => {
                    console.log(response);
                    this.PuzzleWorker.push(response);
                    this.PuzzleWorker.execute(arr);
                });
            },
            sendFragment(fragment) {
                let canvasComponent = this;
                console.log('sending fragment');
                setTimeout(function () {
                    let broadcaster = new Broadcaster(canvasComponent.room, fragment);
                    broadcaster.broadcastFragmentMove();
                }, 100);
            },
            sendGroup(fragment) {
                let canvasComponent = this;
                console.log('sending group');
                setTimeout(function () {
                    let broadcaster = new Broadcaster(canvasComponent.room,fragment);
                    broadcaster.broadcastGroupMove();
                }, 100);
            },
        }
    }
</script>
