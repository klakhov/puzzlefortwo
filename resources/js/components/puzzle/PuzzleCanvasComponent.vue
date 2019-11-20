<template>
    <div class="">
        <canvas id="canvas-puzzle" width="3840" height="2160">
            <!-- ЗАМЕНИТЬ -->
        </canvas>
    </div>
</template>

<script>
    //import Name from 'route'
    import Fragment from "../../classes/Fragment";
    import FragmentGroup from "../../classes/FragmentGroup";
    import FragmentList from "../../classes/FragmentList";
    export default {
        props:[
            //'data'
        ],
        data:function() {
            return {
                //var:val
            }
        },
        components: {
            //'tag-name':Name
        },
        mounted() {
            const FRAMES = 45;
            const imagesX = 4;
            const imagesY = 4;
            const countImages = imagesX * imagesY;

            const FIELD_WIDTH = 1; // Размеры поля
            const FIELD_HEIGHT = 10 / 11; // Местоположение поля в Fragment.js -> (61, 62) строки

            const KEY_showSilhouette = 83; // S
            const KEY_shouldConnect = 32; // SPACE

            const DIRECTORY = "../img/";
            let a = this;
// Массив для изображений
            let arr = [];
            function drawAll() {
                context.clearRect(0,
                    0,
                    canvas.width,
                    canvas.height
                );
                context.beginPath();
                context.rect(
                    a.$root.objects.CanvasCharacteristic.firstX,
                    this.$root.objects.CanvasCharacteristic.firstY,
                    this.$root.objects.CanvasCharacteristic.all_width,
                    this.$root.objects.CanvasCharacteristic.all_height
                );
                context.lineWidth = "10";
                context.strokeStyle = "red";
                context.stroke();
                context.beginPath();
                context.rect(
                    this.$root.objects.CanvasCharacteristic.firstX,
                    this.$root.objects.CanvasCharacteristic.firstY,
                    this.$root.objects.CanvasCharacteristic.width,
                    this.$root.objects.CanvasCharacteristic.height
                );
                context.lineWidth = "10";
                context.strokeStyle = "green";
                context.stroke();

                var lastSeenObject = this.$root.objects.ListObjectHelper.firstVisualObject;
                do {
                    lastSeenObject.value.draw();
                    lastSeenObject = lastSeenObject.next;
                } while (lastSeenObject != null)

            }

// Определяет координаты пользователя в границах canvas
            function getCoords(canvas, x, y) {
                var bbox = canvas.getBoundingClientRect();
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

            var lastDownTarget = null;
            var shouldConnect = false;
            var showSilhouette = false;


                console.log("Started");
                let canvas = document.getElementById("canvas-puzzle");
                let context = canvas.getContext('2d');

                this.$root.objects.CanvasCharacteristic.all_width = canvas.width * FIELD_WIDTH;
                this.$root.objects.CanvasCharacteristic.all_height = canvas.height * FIELD_HEIGHT;


                // Заполнение массива изображениями
                for (let i = 0; i < countImages; i++) {
                    let x = i % imagesX;
                    let y = Math.floor(i / imagesY);

                    let leftId = i % imagesX - 1; // ИСПРАВЛЕНИЕ БАГА в todoist (leftId = i - 1;)
                    let topId = i - imagesY;
                    console.log(i);
                    arr.push(
                        new Fragment(
                            i,
                            DIRECTORY + (i + 1) + '.png',
                            getRandomArbitary(1940, 2720), getRandomArbitary(80, 480),
                            (leftId >= 0 ? arr[i - 1] : null), (topId >= 0 ? arr[topId] : null),
                            this.$root.objects// ЗАМЕНИТЬ
                        )
                    );
                    if (this.$root.objects.ListObjectHelper.lastVisualObject == null) {
                        this.$root.objects.ListObjectHelper.lastVisualObject = new FragmentList(arr[arr.length - 1], null);
                        this.$root.objects.ListObjectHelper.firstVisualObject = this.$root.objects.ListObjectHelper.lastVisualObject;
                    } else {
                        this.$root.objects.ListObjectHelper.lastVisualObject = new FragmentList(arr[arr.length - 1], this.$root.objects.ListObjectHelper.lastVisualObject);
                    }

                }


                // Отслеживать перемещение курсора мыши
                canvas.onmousemove = function(e) {
                    var loc = getCoords(canvas, e.clientX, e.clientY);
                    if (this.$root.objects.SelectFragmentHelper.translatedFragmentId >= 0) {
                        if (arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId].group == null) {
                            arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId].move(loc.x - this.$root.objects.SelectFragmentHelper.deltaX,
                                loc.y - this.$root.objects.SelectFragmentHelper.deltaY);
                        } else if (arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId].group != null) {
                            var newX = loc.x - this.$root.objects.SelectFragmentHelper.deltaX;
                            var newY = loc.y - this.$root.objects.SelectFragmentHelper.deltaY;
                            arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId].group.move(
                                newX, newY,
                                arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId]
                            );
                        }
                    }
                };

                // Отслеживать нажатие на кнопки мыши
                canvas.onmousedown = function(e) {
                    shouldConnect = true;

                    var loc = getCoords(canvas, e.clientX, e.clientY);
                    var lastSeenObject = this.$root.objects.ListObjectHelper.lastVisualObject;
                    do {
                        var objInCoords = this.$root.objects.lastSeenObject.value.isHadPoint(loc.x, loc.y); // у группы или фрагмента
                        // console.log(objInCoords);
                        if (this.$root.objects.lastSeenObject.value instanceof Fragment) {
                            if (objInCoords) {
                                if (
                                    lastSeenObject.value.smoothing === false &&
                                    lastSeenObject.value.isConnecting === false &&
                                    (lastSeenObject.value.group == null || lastSeenObject.value.group.isConnecting === false)
                                ) {
                                    // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
                                    ranges = lastSeenObject.value.rangeToStartImage(loc.x, loc.y);
                                    this.$root.objects.SelectFragmentHelper.deltaX = ranges.x;
                                    this.$root.objects.SelectFragmentHelper.deltaY = ranges.y;
                                    this.$root.objects.SelectFragmentHelper.translatedFragmentId = lastSeenObject.value.ind;
                                    lastSeenObject.replaceToTop(); // отображать поверх других объектов
                                    console.log("Image number", this.$root.objects.SelectFragmentHelper.translatedFragmentId);
                                    break;
                                }
                            }
                        } else if (lastSeenObject.value instanceof FragmentGroup) {
                            if (objInCoords > -1) {
                                if (
                                    arr[objInCoords].smoothing == false &&
                                    arr[objInCoords].isConnecting == false &&
                                    lastSeenObject.value.isConnecting == false
                                ) {
                                    // объект под мышкой, не выполняет анимацию и не подсоединяет к себе чужой объект одновременно
                                    ranges = arr[objInCoords].rangeToStartImage(loc.x, loc.y);
                                    this.$root.objects.SelectFragmentHelper.deltaX = ranges.x;
                                    this.$root.objects.SelectFragmentHelper.deltaY = ranges.y;
                                    this.$root.objects.SelectFragmentHelper.translatedFragmentId = objInCoords;
                                    lastSeenObject.replaceToTop(); // отображать поверх других объектов
                                    console.log("Image number", this.$root.objects.SelectFragmentHelper.translatedFragmentId);
                                    break;
                                }
                            }
                        }
                        lastSeenObject = lastSeenObject.prev;
                    } while (lastSeenObject != null)
                }


                // Отслеживать отжатие кнопок мыши
                canvas.onmouseup = function(e) {
                    if (this.$root.objects.SelectFragmentHelper.translatedFragmentId >= 0) {
                        selectedFragment = arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId];
                        if (shouldConnect) {
                            if (selectedFragment.group == null) {
                                selectedFragment.connectToOther();
                            } else {
                                selectedFragment.group.connectTo()
                            }
                        }
                        this.$root.objects.SelectFragmentHelper.translatedFragmentId = -1;
                    }
                }

                document.addEventListener('mousedown', function(event) {
                    if (lastDownTarget != event.target) {
                        showSilhouette = false;
                    }
                    lastDownTarget = event.target;
                }, false);

                document.addEventListener('keydown', function(event) {
                    if (lastDownTarget == canvas) {
                        if (event.keyCode == KEY_shouldConnect) {
                            if (shouldConnect)
                                shouldConnect = false;
                            else shouldConnect = true;
                            console.log("shouldConnect is", shouldConnect);
                        }
                        if (event.keyCode == KEY_showSilhouette) {
                            showSilhouette = true;
                        }
                        if(event.keyCode == 49) {
                            var lastSeenObject = this.$root.objects.ListObjectHelper.lastVisualObject;
                            do {
                                console.log(lastSeenObject);
                                lastSeenObject = lastSeenObject.prev;
                            } while (lastSeenObject != null)
                            console.log("\nEND\n")
                        }

                        if(event.keyCode == 50) {
                            if(this.$root.objects.SelectFragmentHelper.translatedFragmentId >= 0) {
                                arr[this.$root.objects.SelectFragmentHelper.translatedFragmentId].listElem.remove();
                            }
                        }
                    }
                }, false);

                document.addEventListener('keyup', function(event) {
                    if (lastDownTarget == canvas) {
                        if (event.keyCode == KEY_showSilhouette) {
                            showSilhouette = false;
                        }
                    }
                }, false);

                // Анимация с определённой частотой для обновления экрана
                setInterval(update, 1000 / FRAMES);



// Функция для анимации с определённой частотой для обновления экрана
            function update() {
                drawAll();
            }

        },
        methods:{
        }
    }
</script>
