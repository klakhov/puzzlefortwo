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
<!--                    <img src="" alt="img has not been created yet" >-->
                </div>
            </div>
            <div class="row" style="margin-top:5%;">
                <div class="col-4 container greet-first-col pt-4 pb-4">
                    <div class="row justify-content-center align-items-center" >
                        <img :src="this.teamplay" alt="" class="col-auto" width="120px" height="120px">
                        <div class="col-auto greet-title">
                           Тимплей
                        </div>
                    </div>
                </div>
                <div class="col-4 container greet-first-col pt-4 pb-4"style="background-color:rgb(43,42,41)">
                    <div class="row justify-content-center align-items-center" >
                        <img :src="this.cup" alt="" class="col-auto" width="120px" height="120px">
                        <div class="col-auto greet-title">
                            Достижения
                        </div>
                    </div>
                </div>
                <div class="col-4 container greet-first-col pt-4 pb-4">
                    <div class="row justify-content-center align-items-center" >
                        <img :src="this.preferences" alt="" class="col-auto" width="120px" height="120px">
                        <div class="col-auto greet-title">
                            Настройки
                        </div>
                    </div>
                </div>
            </div>
            <div class="row gray-row">
                <div class="col-md-12 greet-second-info">НАШИ ПРЕИМУЩЕСТВА</div>
                <div class="col-md-4 greet-second-col container">
                    <div class="row justify-content-center white-block pt-5 pb-5" style="margin-right:0;margin-left:0">
                        <div class="col-auto">
                            <img :src="this.play" alt="ach-icon" width="80px" height="80px">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Играйте вместе</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Играть в любую игру в компании всегда веселее</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col container">
                    <div class="row justify-content-center white-block pt-5 pb-5" style="margin-right:0;margin-left:0">
                        <div class="col-auto">
                            <img :src="this.progress" alt="ach-icon" width="80px" height="80px">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Просматривайте прогресс</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Система достижений не даст вам заскучать</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col container">
                    <div class="row justify-content-center white-block pt-5 pb-5" style="margin-right:0;margin-left:0">
                        <div class="col-auto">
                            <img :src="this.settings" alt="ach-icon" width="80px" height="80px">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Настраивайте игру</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Загружайте свои изображения и собирайте из них пазлы</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col container">
                    <div class="row justify-content-center white-block pt-5 pb-5" style="margin-right:0;margin-left:0">
                        <div class="col-auto">
                            <img :src="this.friends" alt="ach-icon" width="80px" height="80px">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Заводите друзей</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Понравилось играть вместе? Добавьте друг друга в друзья</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col container">
                    <div class="row justify-content-center white-block pt-5 pb-5" style="margin-right:0;margin-left:0">
                        <div class="col-auto">
                            <img :src="this.communication" alt="ach-icon" width="80px" height="80px">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Общайтесь</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Делитесь своими мыслями через внутриигровой чат</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 greet-second-col container">
                    <div class="row justify-content-center white-block pt-5 pb-5" style="margin-right:0;margin-left:0">
                        <div class="col-auto">
                            <img :src="this.support" alt="ach-icon" width="80px" height="80px">
                        </div>
                        <div class="col-12 ach-header">
                            <span>Поддержка</span>
                        </div>
                        <div class="col-12 ach-pattern">
                            <span>Мы готовы оперативно помочь с любой вашей проблемой</span>
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
                slideIndex:0,
                cup: "/img/main-page/cup.png",
                preferences: "/img/main-page/preferences.png",
                teamplay: "/img/main-page/teamplay.png",
                play:"/img/main-page/play.png",
                progress:"/img/main-page/progress.png",
                friends:"/img/main-page/friends.png",
                settings:"/img/main-page/settings.png",
                support:"/img/main-page/support.png",
                communication: "/img/main-page/commuication.png"
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
