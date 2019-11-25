<template>
    <div class="">
        <canvas id="canvas-puzzle" width="3840" height="2160"></canvas>
    </div>
</template>

<script>
    //import Name from 'route'
    import Fragment from "../../classes/Fragment";
    import FragmentGroup from "../../classes/FragmentGroup";
    import FragmentList from "../../classes/FragmentList";
    import Broadcaster from '../../classes/Broadcaster';
    import PuzzleWorker from "../../classes/PuzzleWorker";
    export default {
        props: [
            'room',
            'user_1',
            'user_2'
        ],
        data: function () {
            return {
                arr: [],
                mouseMove: false,
                objects: {},
                PuzzleWorker:{},
                workerTasks:[],
            }
        },
        components: {
            //'tag-name':Name
        },
        mounted() {

            let globalConstants = this.$root.globalConstants;
            let objects = this.$root.objects;
            let globalVariables = this.$root.globalVariables;
            let canvasComponent = this;
            this.broadcasterHelper = this.$root.broadcasterHelper;
            this.objects = this.$root.objects;
// Массив для изображений
            let arr = this.arr;
            this.PuzzleWorker = new PuzzleWorker();
            this.listenPuzzleMove();

            function drawAll() {
                context.clearRect(0,
                    0,
                    canvas.width,
                    canvas.height
                );
                context.beginPath();
                context.rect(
                    objects.CanvasCharacteristic.firstX,
                    objects.CanvasCharacteristic.firstY,
                    objects.CanvasCharacteristic.all_width,
                    objects.CanvasCharacteristic.all_height
                );
                context.lineWidth = "10";
                context.strokeStyle = "red";
                context.stroke();
                context.beginPath();
                context.rect(
                    objects.CanvasCharacteristic.firstX,
                    objects.CanvasCharacteristic.firstY,
                    objects.CanvasCharacteristic.width,
                    objects.CanvasCharacteristic.height
                );
                context.lineWidth = "10";
                context.strokeStyle = "green";
                context.stroke();

                let lastSeenObject = objects.ListObjectHelper.firstVisualObject;
                do {
                    lastSeenObject.value.draw();
                    lastSeenObject = lastSeenObject.next;
                } while (lastSeenObject != null)

            }

// Определяет координаты пользователя в границах canvas
            function getCoords(canvas, x, y) {
                let bbox = canvas.getBoundingClientRect();
                return {
                    x: (x - bbox.left) * (canvas.width / bbox.width),
                    y: (y - bbox.top) * (canvas.height / bbox.height)
                };
            }

//рандом чисел
            function getRandomArbitary(min, max) {
                return Math.ceil(Math.random() * (max - min) + min);
            }

// При загрузке экрана
//              Перенесены в obj/globalVariables
//             let lastDownTarget = null;
//             let shouldConnect = false;
//             let showSilhouette = false;


            console.log("Started");
            let canvas = document.getElementById("canvas-puzzle");
            let context = canvas.getContext('2d');

            objects.CanvasCharacteristic.all_width = canvas.width * globalConstants.FIELD_WIDTH;
            objects.CanvasCharacteristic.all_height = canvas.height * globalConstants.FIELD_HEIGHT;


            // Заполнение массива изображениями
            for (let i = 0; i < globalConstants.countImages; i++) {// globalConstants.countImages
                // let x = i % globalConstants.imagesX;
                // let y = Math.floor(i / globalConstants.imagesY);

                let leftId = i % globalConstants.imagesX - 1; // ИСПРАВЛЕНИЕ БАГА в todoist (leftId = i - 1;)
                let topId = i - globalConstants.imagesY;
                console.log(i);
                arr.push(
                    new Fragment(
                        i,
                        globalConstants.DIRECTORY + (i + 1) + '.png',
                        getRandomArbitary(1940, 2720), getRandomArbitary(80, 480),
                        (leftId >= 0 ? arr[i - 1] : null), (topId >= 0 ? arr[topId] : null),
                        objects,
                        globalConstants,
                        globalVariables,// ЗАМЕНИТЬ
                    )
                );
                if (objects.ListObjectHelper.lastVisualObject == null) {
                    objects.ListObjectHelper.lastVisualObject = new FragmentList(arr[arr.length - 1], null, objects);
                    objects.ListObjectHelper.firstVisualObject = objects.ListObjectHelper.lastVisualObject;
                } else {
                    objects.ListObjectHelper.lastVisualObject = new FragmentList(arr[arr.length - 1], objects.ListObjectHelper.lastVisualObject, objects);
                }

            }


            // Отслеживать перемещение курсора мыши
            canvas.onmousemove = function (e) {
                let loc = getCoords(canvas, e.clientX, e.clientY);
                if (objects.SelectFragmentHelper.translatedFragmentId >= 0) {
                    if (arr[objects.SelectFragmentHelper.translatedFragmentId].group == null) {
                        arr[objects.SelectFragmentHelper.translatedFragmentId].move(loc.x - objects.SelectFragmentHelper.deltaX,
                            loc.y - objects.SelectFragmentHelper.deltaY);
                    } else if (arr[objects.SelectFragmentHelper.translatedFragmentId].group != null) {
                        let newX = loc.x - objects.SelectFragmentHelper.deltaX;
                        let newY = loc.y - objects.SelectFragmentHelper.deltaY;
                        arr[objects.SelectFragmentHelper.translatedFragmentId].group.move(
                            newX, newY,
                            arr[objects.SelectFragmentHelper.translatedFragmentId]
                        );
                    }
                }
            };

            // Отслеживать нажатие на кнопки мыши
            canvas.onmousedown = function (e) {
                globalVariables.shouldConnect = true;

                let loc = getCoords(canvas, e.clientX, e.clientY);
                let lastSeenObject = objects.ListObjectHelper.lastVisualObject;
                do {
                    let objInCoords = lastSeenObject.value.isHadPoint(loc.x, loc.y); // у группы или фрагмента
                    // console.log(objInCoords);
                    if (lastSeenObject.value instanceof Fragment) {
                        if (objInCoords) {
                            if (
                                lastSeenObject.value.smoothing === false &&
                                lastSeenObject.value.isConnecting === false &&
                                (lastSeenObject.value.group == null || lastSeenObject.value.group.isConnecting === false)
                            ) {
                                // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
                                let ranges = lastSeenObject.value.rangeToStartImage(loc.x, loc.y);
                                objects.SelectFragmentHelper.deltaX = ranges.x;
                                objects.SelectFragmentHelper.deltaY = ranges.y;
                                objects.SelectFragmentHelper.translatedFragmentId = lastSeenObject.value.ind;
                                lastSeenObject.replaceToTop(); // отображать поверх других объектов
                                console.log("Image number", objects.SelectFragmentHelper.translatedFragmentId);
                                break;
                            }
                        }
                    } else if (lastSeenObject.value instanceof FragmentGroup) {
                        if (objInCoords > -1) {
                            if (
                                arr[objInCoords].smoothing === false &&
                                arr[objInCoords].isConnecting === false &&
                                lastSeenObject.value.isConnecting === false
                            ) {
                                // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
                                let ranges = arr[objInCoords].rangeToStartImage(loc.x, loc.y);
                                objects.SelectFragmentHelper.deltaX = ranges.x;
                                objects.SelectFragmentHelper.deltaY = ranges.y;
                                objects.SelectFragmentHelper.translatedFragmentId = objInCoords;
                                lastSeenObject.replaceToTop(); // отображать поверх других объектов
                                console.log("Image number", objects.SelectFragmentHelper.translatedFragmentId);
                                break;
                            }
                        }
                    }
                    lastSeenObject = lastSeenObject.prev;
                } while (lastSeenObject != null)
            };


            // Отслеживать отжатие кнопок мыши
            canvas.onmouseup = function () {
                if (objects.SelectFragmentHelper.translatedFragmentId >= 0) {
                    let selectedFragment = arr[objects.SelectFragmentHelper.translatedFragmentId];
                    if (globalVariables.shouldConnect) {
                        if (selectedFragment.group == null) {
                            // selectedFragment.broadcasterConnecting(true);//задать свойство для броадкастера чтобы он знал, что надо коннектить
                            selectedFragment.connectToOther();//ПОЧЕМУ ЭТОТ МЕСТО НЕ ГАРАНТИРУЕТ НАМ ПРИСОЕДИНЕНИЯ?????
                        } else {
                            selectedFragment.broadcasterConnecting(true);//задать свойство для броадкастера чтобы он знал, что надо коннектить
                            selectedFragment.group.connectTo();//А ЭТО ГАРАНТИРУЕТ НАМ ПРИСОЕДИНЕНИе?????
                        }
                    }else{
                        selectedFragment.broadcasterConnecting(false);//задать свойство для броадкастера чтобы он знал, что  НЕ надо коннектить
                    }
                    if(selectedFragment.group == null){
                        canvasComponent.sendFragment(arr[objects.SelectFragmentHelper.translatedFragmentId]);//отправить данные
                    }else{
                        canvasComponent.sendGroup(arr[objects.SelectFragmentHelper.translatedFragmentId]);//отправить данные
                    }
                    objects.SelectFragmentHelper.translatedFragmentId = -1;
                }
            };

            document.addEventListener('mousedown', function (event) {
                if (globalVariables.lastDownTarget !== event.target) {
                    globalVariables.showSilhouette = false;
                }
                globalVariables.lastDownTarget = event.target;
            }, false);

            document.addEventListener('keydown', function (event) {
                if (globalVariables.lastDownTarget === canvas) {
                    if (event.keyCode === globalConstants.KEY_shouldConnect) {
                        if (globalVariables.shouldConnect)
                            globalVariables.shouldConnect = false;
                        else globalVariables.shouldConnect = true;
                        console.log("shouldConnect is", globalVariables.shouldConnect);
                    }
                    if (event.keyCode === globalConstants.KEY_showSilhouette) {
                        globalVariables.showSilhouette = true;
                    }
                    if (event.keyCode === 49) {
                        var lastSeenObject = objects.ListObjectHelper.lastVisualObject;
                        do {
                            console.log(lastSeenObject);
                            lastSeenObject = lastSeenObject.prev;
                        } while (lastSeenObject != null);
                        console.log("\nEND\n")
                    }

                    if (event.keyCode === 50) {
                        if (objects.SelectFragmentHelper.translatedFragmentId >= 0) {
                            arr[objects.SelectFragmentHelper.translatedFragmentId].listElem.remove();
                        }
                    }
                }
            }, false);

            document.addEventListener('keyup', function (event) {
                if (globalVariables.lastDownTarget === canvas) {
                    if (event.keyCode === KEY_showSilhouette) {
                        globalVariables.showSilhouette = false;
                    }
                }
            }, false);

            // Анимация с определённой частотой для обновления экрана
            setInterval(update, 1000 / globalConstants.FRAMES);


// Функция для анимации с определённой частотой для обновления экрана
            function update() {
                drawAll();
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
                    let broadcaster = new Broadcaster(canvasComponent.room, canvasComponent.user_1, fragment);
                    broadcaster.broadcastFragmentMove();
                }, 100);
            },
            sendGroup(fragment) {
                let canvasComponent = this;
                console.log('sending group');
                setTimeout(function () {
                    let broadcaster = new Broadcaster(canvasComponent.room, canvasComponent.user_1, fragment);
                    broadcaster.broadcastGroupMove();
                }, 100);
            },
        }
    }
</script>
