<template>
    <div>
        <div class="container-fluid gray-fone" style="scroll:hidden">
            <div class="container slider" id="slider">
                <div class="row">
                    <div class="col content-info content-info-big">Пазлы для игры с другом</div>
                </div>
                <div class="row">
                    <div class="col content-info content-info-small">Играть вместе всегда приятнее</div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col greet-holder">
                    <a href="#">Приветствуем в PuzzleForTwo</a>
                </div>
            </div>
            <div class="row">
                <div class="col greet-info">
                    <i>Не просто возможность собирать пазлы, это возможность собирать пазлы в компании
                        людей, которые находятся от вас на расстоянии. Создавайте аккаунт, приглашайте
                        друзей и начинайте играть. Получайте достижения,отслеживайте статистику других
                        игроков, заводите новых друзей, станьте настоящим спидпазлером</i>
                </div>
            </div>
            <div class="row">
                <div class="col greet-img">
                    <img src="" alt="img has not been created yet" >
                </div>
            </div>
            <div class="row" style="margin-top:5%;">
                <div class="col-4 greet-first-col">
                    <img src="" alt="" width="90px" height="60px">
                    <span>Тимплей</span>
                </div>
                <div class="col-4 greet-first-col" style="background-color:rgb(43,42,41)">
                    <img src="" alt="" width="60px" height="60px">
                    <span>Достижения</span>
                </div>
                <div class="col-4 greet-first-col">
                    <img src="" alt="" width="60px" height="60px">
                    <span>Настройки</span>
                </div>
            </div>
            <div class="row gray-row">
                <div class="col-md-12 greet-second-info">НАШИ ПРЕИМУЩЕСТВА</div>
                <div class="col-md-4 greet-second-col">
                    <div class="row white-block" style="margin-right:0;margin-left:0">
                        <div class="col-12">
                            <img src="" alt="ach-icon">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Ach-header</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Ach-pattern</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col">
                    <div class="row white-block" style="margin-right:0;margin-left:0">
                        <div class="col-12">
                            <img src="" alt="ach-icon">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Ach-header</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Ach-pattern</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col">
                    <div class="row white-block" style="margin-right:0;margin-left:0">
                        <div class="col-12">
                            <img src="" alt="ach-icon">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Ach-header</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Ach-pattern</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col">
                    <div class="row white-block" style="margin-right:0;margin-left:0">
                        <div class="col-12">
                            <img src="" alt="ach-icon">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Ach-header</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Ach-pattern</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col">
                    <div class="row white-block" style="margin-right:0;margin-left:0">
                        <div class="col-12">
                            <img src="" alt="ach-icon">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Ach-header</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Ach-pattern</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col">
                    <div class="row white-block" style="margin-right:0;margin-left:0">
                        <div class="col-12">
                            <img src="" alt="ach-icon">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Ach-header</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Ach-pattern</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid" style="margin-top:2%;background:rgb(36,36,36);padding:1%">
            <div class="row justify-content-center">
                <div class="col-md-12 bottom-info">Puzzle For Two</div>
                <div class="col-md-12 bottom-info">&copy;2019</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return{
                slideIndex:0
            }
        },
        mounted(){
            this.slide();
        },
        methods:{
            slide(){
                let imgBlock = $("#slider");
                switch (this.slideIndex) {
                    case 0:
                        imgBlock.css({'backgroundImage':'url(../img/main-page/img_nature_wide.jpg)'});
                        break;
                    case 1:
                        imgBlock.css({'backgroundImage':'url(../img/main-page/img_mountains_wide.jpg)'});
                        break;
                }
                this.slideIndex++;
                if(this.slideIndex > 1){
                    this.slideIndex = 0;
                }
                setTimeout(this.slide, 5000);
            }
        }
    }
</script>
