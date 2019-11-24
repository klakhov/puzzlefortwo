// Возможно стоит убрать подключение к smoothing объекту. а то проблем слишком дохуя??
// на заметку, потом посмотрим
import FragmentGroup from "./FragmentGroup";

var hello = 4;
export default class Fragment {
    constructor(ind, src, x, y, left, top, objects, globalConstants, globalVariables) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = this.src;
        this.ind = ind;

        this.objects = objects;
        this.globalConstants = globalConstants;
        this.globalVariables = globalVariables;

        this.downloadImage();

        this.smoothing = false; // для ограничения движения объекта во время анимации
        this.isConnecting = false; // объект конектит другой, а потому не может быть выбран. Необходим int, т.к. можно подключать несколько сразу
                                   // После первого isConnecting станет false, хотя подключается ещё второй объект, а потому будет
        this.shouldConnect = false; // Поле для броадкастера чтобы понять остальным клиентам, нужно ли проверять фрагмент на присоеденение
        objects.FragmentsGeneralCharacteristic.third_x = objects.FragmentsGeneralCharacteristic.SCALE / 5;
        objects.FragmentsGeneralCharacteristic.third_y = objects.FragmentsGeneralCharacteristic.SCALE / 5;
        objects.FragmentsGeneralCharacteristic.connectRange = objects.FragmentsGeneralCharacteristic.third_x * 2; // ВРЕМЕННО

        this.left = left;
        this.top = top;
        this.right = null;
        this.bottom = null;
        if (this.left != null)
            this.left.right = this;
        if (this.top != null)
            this.top.bottom = this;

        this.group = null;
        this.listElem = null; // заполняется
    }

    downloadImage() {
        let objects = this.objects;
        let globalConstants = this.globalConstants;
        let globalVariables = this.globalVariables;
        let canvas = document.getElementById("canvas-puzzle");
        let context = canvas.getContext('2d');

        this.img.onload = function () {
            objects.FragmentsGeneralCharacteristic.downloadedImages++;
            if (objects.FragmentsGeneralCharacteristic.downloadedImages === globalConstants.countImages) {
                console.log("Downloaded all images");

                objects.FragmentsGeneralCharacteristic.width = this.width;
                objects.FragmentsGeneralCharacteristic.height = this.height;

                objects.FragmentsGeneralCharacteristic.SCALE = (
                    Math.min(
                        objects.CanvasCharacteristic.all_width / (globalConstants.imagesX / 5 * 3) / objects.FragmentsGeneralCharacteristic.width,
                        objects.CanvasCharacteristic.all_height / (globalConstants.imagesY / 5 * 3) / objects.FragmentsGeneralCharacteristic.height
                    )
                );
                objects.FragmentsGeneralCharacteristic.widthScale = Math.floor(objects.FragmentsGeneralCharacteristic.SCALE * objects.FragmentsGeneralCharacteristic.width);
                objects.FragmentsGeneralCharacteristic.heightScale = Math.floor(objects.FragmentsGeneralCharacteristic.SCALE * objects.FragmentsGeneralCharacteristic.height);

                objects.FragmentsGeneralCharacteristic.third_x = objects.FragmentsGeneralCharacteristic.widthScale / 5;
                objects.FragmentsGeneralCharacteristic.third_y = objects.FragmentsGeneralCharacteristic.heightScale / 5;

                objects.FragmentsGeneralCharacteristic.connectRange = Math.min(
                    objects.FragmentsGeneralCharacteristic.third_x,
                    objects.FragmentsGeneralCharacteristic.third_y
                );
                objects.CanvasCharacteristic.width = objects.FragmentsGeneralCharacteristic.widthScale / 5 * 3 * globalConstants.imagesX;
                objects.CanvasCharacteristic.height = objects.FragmentsGeneralCharacteristic.heightScale / 5 * 3 * globalConstants.imagesY;

                objects.CanvasCharacteristic.firstX = canvas.width / 2 - objects.CanvasCharacteristic.width / 2;
                objects.CanvasCharacteristic.firstY = 60;

                objects.CanvasCharacteristic.lastX = objects.CanvasCharacteristic.firstX + objects.CanvasCharacteristic.width;
                objects.CanvasCharacteristic.lastY = objects.CanvasCharacteristic.firstY + objects.CanvasCharacteristic.height;
            }
        }
    }


    // Отображает изображение в заданных координатах
    draw() {
        let objects = this.objects;
        let globalConstants = this.globalConstants;
        let globalVariables = this.globalVariables;
        let canvas = document.getElementById("canvas-puzzle");
        let context = canvas.getContext('2d');

        if (!globalVariables.showSilhouette) {
            context.drawImage(this.img,
                this.x,
                this.y,
                objects.FragmentsGeneralCharacteristic.widthScale,
                objects.FragmentsGeneralCharacteristic.heightScale
            )
        } else {
            context.beginPath();
            context.rect(
                this.x + objects.FragmentsGeneralCharacteristic.third_x,
                this.y + objects.FragmentsGeneralCharacteristic.third_y,
                objects.FragmentsGeneralCharacteristic.widthScale - 2 * objects.FragmentsGeneralCharacteristic.third_x,
                objects.FragmentsGeneralCharacteristic.heightScale - 2 * objects.FragmentsGeneralCharacteristic.third_y
            );
            context.lineWidth = "7";
            context.strokeStyle = "black";
            context.stroke();
        }
    }

    // Проверяет, есть ли в границах изображения заданная точка или нет
    // Нужно для проверки наведения курсора мыши на изображение
    isHadPoint(x, y) {
        let objects = this.objects;
        return (
            x >= this.x + objects.FragmentsGeneralCharacteristic.third_x &&
            x <= (this.x + objects.FragmentsGeneralCharacteristic.widthScale - objects.FragmentsGeneralCharacteristic.third_x) &&
            y >= (this.y + objects.FragmentsGeneralCharacteristic.third_y) &&
            y <= (this.y + objects.FragmentsGeneralCharacteristic.heightScale - objects.FragmentsGeneralCharacteristic.third_y)

        )
    }

    // Расстояниме от курсора мыши до старта изображения в левом верхнем углу в пикселях.
    // Если это расстояние не учитывать, то изображение при его взятии будет телепортировано
    // Левым верхним углом к положению курсора, а так к тому положению прибавляется разница
    // в координатах, обеспечивая тем самым отсутствие рывков
    rangeToStartImage(x, y) {
        return {
            x: x - this.x,
            y: y - this.y
        };
    }

    workGroups(selected, other) {
        if (selected.group == null) {
            if (other.group == null) {
                // создание группы
                selected.group = new FragmentGroup();
                other.group = selected.group;
                selected.group.fragments.add(selected);
                selected.group.fragments.add(other);

                selected.listElem.value = selected.group; // ссылка на фрагмент заменяется на ссылку на группу
                selected.group.listElemGroup = selected.listElem;
                other.listElem.remove(); // удаление "лишнего" объекта из очереди на запись, т.к. он уже отрисовывается в группе

                // TODO Группы в FragmentList

            } else {
                // selected - not group;
                // other - group

                // меняем все элементы бОльшей группы, а не наооброт, т.к. ебанутый баг: плохо идет коннект одиночных к группе, если та группа не пред верхняя
                selected.group = other.group;
                selected.group.fragments.add(selected);

                // selected.group = new FragmentGroup();
                // other.group.changeGroup(selected.group);
                // selected.group.fragments.add(selected);

                // other.listElem.remove();
                // other.group.listElemGroup

                selected.listElem.remove();

            }
        } else {
            if (other.group == null) {
                other.group = selected.group;
                selected.group.fragments.add(other);

                selected.listElem.value = selected.group; // ссылка на фрагмент заменяется на ссылку на чужую группу
                other.listElem.remove();

            } else {
                selected.group.changeGroup(other.group)
            }
        }
    }

    rightTop() {
        let objects = this.objects;
        return {
            x: this.x + objects.FragmentsGeneralCharacteristic.widthScale - objects.FragmentsGeneralCharacteristic.third_x,
            y: this.y + objects.FragmentsGeneralCharacteristic.third_y
        }
    }

    leftTop() {
        let objects = this.objects;

        return {
            x: this.x + objects.FragmentsGeneralCharacteristic.third_x,
            y: this.y + objects.FragmentsGeneralCharacteristic.third_y
        }
    }

    rightBot() {
        let objects = this.objects;
        return {
            x: this.x + objects.FragmentsGeneralCharacteristic.widthScale - objects.FragmentsGeneralCharacteristic.third_x,
            y: this.y + objects.FragmentsGeneralCharacteristic.heightScale - objects.FragmentsGeneralCharacteristic.third_y
        }
    }

    leftBot() {
        let objects = this.objects;
        return {
            x: this.x + objects.FragmentsGeneralCharacteristic.third_x,
            y: this.y + objects.FragmentsGeneralCharacteristic.heightScale - objects.FragmentsGeneralCharacteristic.third_y
        }
    }

    canConnectRightFragment() {
        let objects = this.objects;
        var leftTopOfRightFragment = this.right.leftTop();
        var tmpRes = this.rangeFromRightTop(leftTopOfRightFragment.x, leftTopOfRightFragment.y);
        if (tmpRes <= objects.FragmentsGeneralCharacteristic.connectRange)
            return {
                res: true,
                range: tmpRes
            };
        return {
            res: false
        };
    }

    rangeFromRightTop(x, y) {
        var rT = this.rightTop();
        return Math.sqrt((rT.y - y) * (rT.y - y) +
            (rT.x - x) * (rT.x - x))
    }

    canConnectLeftFragment() {
        let objects = this.objects;
        var rightTopOfLeftFragment = this.left.rightTop();
        var tmpRes = this.rangeFromLeftTop(rightTopOfLeftFragment.x, rightTopOfLeftFragment.y);
        if (tmpRes <= objects.FragmentsGeneralCharacteristic.connectRange)
            return {
                res: true,
                range: tmpRes
            };
        return {
            res: false
        };
    }

    rangeFromLeftTop(x, y) {
        var lT = this.leftTop();
        return Math.sqrt((lT.y - y) * (lT.y - y) +
            (lT.x - x) * (lT.x - x))
    }

    canConnectBottomFragment() {
        let objects = this.objects;
        var leftTopOfBottomFragment = this.bottom.leftTop();
        var tmpRes = this.rangeFromLeftBottom(leftTopOfBottomFragment.x, leftTopOfBottomFragment.y);
        if (tmpRes <= objects.FragmentsGeneralCharacteristic.connectRange)
            return {
                res: true,
                range: tmpRes
            };
        return {
            res: false
        };
    }

    rangeFromLeftBottom(x, y) {
        var lB = this.leftBot();
        return Math.sqrt((lB.y - y) * (lB.y - y) +
            (lB.x - x) * (lB.x - x))
    }

    canConnectTopFragment() {
        let objects = this.objects;
        var leftBotOfTopFragment = this.top.leftBot();
        var tmpRes = this.rangeFromLeftTop(leftBotOfTopFragment.x, leftBotOfTopFragment.y);
        if (tmpRes <= objects.FragmentsGeneralCharacteristic.connectRange)
            return {
                res: true,
                range: tmpRes
            };
        return {
            res: false
        };
    }

    rangeFromRightBottom(x, y) {
        var rB = this.rightBot();
        return Math.sqrt((rB.y - y) * (rB.y - y) +
            (rB.x - x) * (rB.x - x))
    }

    smoothmoveOneOrGroup(fr, x, y, connectingFragment) {
        this.shouldConnect = true; // если работает этот метод, значит наш фрагмент начал коннект к кому-то, об этом должен знать броадкастер
        // нахера тут 2 первых аргумента я уже не ебу, убрал к хуям
        // connectingFragment для передачи в smoothMove. Если тот, к кому клеется движется, то и этот должен двигаться
        // просто добавление в группу не работает при его smoothMove

        if (fr.group == null) {
            fr.smoothMove(x, y, connectingFragment);
        } else {
            fr.group.smoothMove(x, y, this, connectingFragment); // допилим позже
        }
    }

    connectToOther(newInd = null, withConnect = true) {
        // возвращает объект, чтобы в будущем добавить сортировку по расстоянию для групп
        // newInd чтобы сравнивать объекты, на которые мы Не нажали, но которые обрабатываются
        // внутри группы на сближение с углами

        // withConnect - для проверки ближайшего конекта без конекта лол
        let objects = this.objects;
        let globalConstants = this.globalConstants;
        let globalVariables = this.globalVariables;

        var i = null;
        if (newInd == null) {
            i = objects.SelectFragmentHelper.translatedFragmentId
        } else {
            i = newInd;
        }
        let x = i % globalConstants.imagesX;
        let y = Math.floor(i / globalConstants.imagesY);

        if (x === 0 && y === 0 && this.rangeFromLeftTop(objects.CanvasCharacteristic.firstX, objects.CanvasCharacteristic.firstY) <= objects.FragmentsGeneralCharacteristic.connectRange) {
            if (withConnect) {
                this.smoothmoveOneOrGroup(
                    this,
                    objects.CanvasCharacteristic.firstX - objects.FragmentsGeneralCharacteristic.third_x,
                    objects.CanvasCharacteristic.firstY - objects.FragmentsGeneralCharacteristic.third_y
                );
            }
            return {
                res: true,
                range: 0
            };
        } else if (x === globalConstants.imagesX - 1 && y === 0 && this.rangeFromRightTop(objects.CanvasCharacteristic.lastX, objects.CanvasCharacteristic.firstY) <= objects.FragmentsGeneralCharacteristic.connectRange) {
            if (withConnect) {
                this.smoothmoveOneOrGroup(
                    this,
                    objects.CanvasCharacteristic.lastX + objects.FragmentsGeneralCharacteristic.third_x - objects.FragmentsGeneralCharacteristic.widthScale,
                    objects.CanvasCharacteristic.firstY - objects.FragmentsGeneralCharacteristic.third_y
                );
            }
            return {
                res: true,
                range: 0
            };
        } else if (x === globalConstants.imagesX - 1 && y === globalConstants.imagesY - 1 && this.rangeFromRightBottom(objects.CanvasCharacteristic.lastX, objects.CanvasCharacteristic.lastY) <= objects.FragmentsGeneralCharacteristic.connectRange) {
            if (withConnect) {
                this.smoothmoveOneOrGroup(
                    this,
                    objects.CanvasCharacteristic.lastX + objects.FragmentsGeneralCharacteristic.third_x - objects.FragmentsGeneralCharacteristic.widthScale,
                    objects.CanvasCharacteristic.lastY + objects.FragmentsGeneralCharacteristic.third_y - objects.FragmentsGeneralCharacteristic.heightScale
                );
            }
            return {
                res: true,
                range: 0
            };
        } else if (x === 0 && y === globalConstants.imagesY - 1 && this.rangeFromLeftBottom(objects.CanvasCharacteristic.firstX, objects.CanvasCharacteristic.lastY) <= objects.FragmentsGeneralCharacteristic.connectRange) {
            if (withConnect) {
                this.smoothmoveOneOrGroup(
                    this,
                    objects.CanvasCharacteristic.firstX - objects.FragmentsGeneralCharacteristic.third_x,
                    objects.CanvasCharacteristic.lastY + objects.FragmentsGeneralCharacteristic.third_y - objects.FragmentsGeneralCharacteristic.heightScale
                );
            }
            return {
                res: true,
                range: 0
            };
        } else {
            let leftFragment = this.left;
            let rightFragment = this.right;
            let topFragment = this.top;
            let bottomFragment = this.bottom;

            let connectArray = [];
            let inner_this = this;

            function connectToFragment(other, getInfo, getCoordinates, newX, newY) {
                if (getInfo.res && (inner_this.group == null || !inner_this.group.fragments.has(other))) {
                    // работает только на объекты, отсутствующие в группе
                    connectArray.push({
                        range: getInfo.range,
                        x: getCoordinates.x,
                        y: getCoordinates.y,
                        dX: newX,
                        dY: newY,
                        fr: other
                    })
                }
            }

            if (topFragment != null)
                connectToFragment(
                    topFragment,
                    topFragment.canConnectBottomFragment(),
                    topFragment.leftBot(),
                    -objects.FragmentsGeneralCharacteristic.third_x,
                    -objects.FragmentsGeneralCharacteristic.third_y
                );
            if (leftFragment != null)
                connectToFragment(
                    leftFragment,
                    leftFragment.canConnectRightFragment(),
                    leftFragment.rightTop(),
                    -objects.FragmentsGeneralCharacteristic.third_x,
                    -objects.FragmentsGeneralCharacteristic.third_y
                );
            if (bottomFragment != null)
                connectToFragment(
                    bottomFragment,
                    bottomFragment.canConnectTopFragment(),
                    bottomFragment.leftTop(),
                    -objects.FragmentsGeneralCharacteristic.third_x,
                    -objects.FragmentsGeneralCharacteristic.heightScale + objects.FragmentsGeneralCharacteristic.third_y
                );
            if (rightFragment != null)
                connectToFragment(
                    rightFragment,
                    rightFragment.canConnectLeftFragment(),
                    rightFragment.leftTop(),
                    -objects.FragmentsGeneralCharacteristic.widthScale + objects.FragmentsGeneralCharacteristic.third_x,
                    -objects.FragmentsGeneralCharacteristic.third_y
                );

            connectArray.sort(function (a, b) {
                return a.range - b.range
            });
            if (connectArray.length > 0) {
                var near = connectArray[0];
                // Из-за второго условия нельзя конектиться к тем, что движутся или уже ждут подключения. Я убрал как и написано сверху. Крч теперь
                // функциональность сдохла, но этого никто и не заметит при быстрой анимации, главное нет багов
                if (withConnect && (near.fr.smoothing == false && near.fr.isConnecting == false && (near.fr.group == null || near.fr.group.isConnecting == false))) {
                    this.smoothmoveOneOrGroup(this, near.x + near.dX, near.y + near.dY, near.fr);
                }
                return {
                    res: true,
                    range: near.range
                };
            }
            return {
                res: false
            };
        }
    }

    //передать данные idSelected/x/y/move
    // Изменяет местоположение изображения
    move(x, y) {
        this.x = x;
        this.y = y;
    }

    //передать данные idSelected/x/y/smoothMove
    smoothMove(newX, newY, connectingFragment = null) {
        // тупо вызвать в аргументаъ объект, если идет смув к нему. Он может двигаться, в этом проблема
        // перемещаемся с его скоростью и без проблем настигаем нахуй хохо Снова пишу в час ночи а завтра 1 пара
        // охуенно.

        // connectingFragment - фрагмент, к которому я конекчусь.
        // при измнении его координат мои подстраиваются

        // Во время проведения анимации запрещается его двигать как либо!!!
        // это приведет к нереальному пиздецу

        // если объект ещё смувится, а к нему смув другого закончился, то надо тот пододвигать

        this.smoothing = true;
        if (connectingFragment != null) {
            if (connectingFragment.group != null) {
                connectingFragment.group.isConnecting = true;
            } else {
                connectingFragment.isConnecting = true;
            }
        }

        let objects = this.objects;
        let globalConstants = this.globalConstants;

        let oldX = this.x;
        let oldY = this.y;
        let tact = 21;
        let currentTact = 0;
        let dX = (newX - oldX) / (tact);
        let dY = (newY - oldY) / (tact);
        let fragment = this;

        let speedAnimation = 1000 / globalConstants.FRAMES / tact;

        var connectingX = -1;
        var connectingY = -1;
        var connectingX_start = -1;
        var connectingY_start = -1;
        if (connectingFragment != null) {
            connectingX = connectingFragment.x;
            connectingY = connectingFragment.y;
            connectingX_start = connectingX;
            connectingY_start = connectingY;
        }

        //тактовая отрисовка
        function reDraw() {
            fragment.x += dX;
            fragment.y += dY;
            // при изменении координат присоединяющего элемента следуем за ним
            // по разнице координат
            if (connectingFragment != null &&
                (
                    connectingX != connectingFragment.x ||
                    connectingY != connectingFragment.y)
            ) {
                fragment.x += connectingFragment.x - connectingX;
                fragment.y += connectingFragment.y - connectingY;

                connectingX = connectingFragment.x;
                connectingY = connectingFragment.y;
            }

            if (currentTact < tact - 1) {
                setTimeout(reDraw, speedAnimation); //ИЗМЕНЕНО
                currentTact++;
            } else {
                fragment.x = newX;
                fragment.y = newY;
                if (connectingFragment != null) {

                    // Если объект подошёл к родителю, но тот ещё смувится, то копировать его перемещение до конца смува последнего.
                    function copyPositionIfNotSmoothmove() {
                        fragment.x += connectingFragment.x - connectingX;
                        fragment.y += connectingFragment.y - connectingY;

                        connectingX = connectingFragment.x;
                        connectingY = connectingFragment.y;

                        if (connectingFragment.smoothing) {
                            // проверка для повтора смува
                            setTimeout(copyPositionIfNotSmoothmove, speedAnimation);
                        } else {
                            // при окончании убрать смув и добавить возможность к управлению элементов мышкой, убрав isConnecting и smoothing у всех элементов
                            fragment.smoothing = false; // движется до тех пор, пока движется родитель
                            if (connectingFragment != null) {
                                if (connectingFragment.group != null) {
                                    connectingFragment.group.isConnecting = false;
                                }
                                connectingFragment.isConnecting = false;
                            }
                        }
                    }

                    copyPositionIfNotSmoothmove();

                    // установка финальных координат
                    fragment.x += connectingX - connectingX_start;
                    fragment.y += connectingY - connectingY_start;

                    fragment.workGroups(fragment, connectingFragment);

                    // в конце добавляем объект к группе. В начале нельзя делать, иначе фрагмент будети
                    // копировать поведение выбранного объекта, а он и так движется за подсоединяющим в smoothMove
                    // а так не будет
                } else {
                    fragment.smoothing = false; // нет родителя, незачем двигаться
                }
            }
        }

        reDraw();
    }
}
