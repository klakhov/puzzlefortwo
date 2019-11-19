<template>
    <div class="">
        <ul id="left-menu">
            <li class="left-menu-li" @click="showProfile">Профиль</li>
            <li class="left-menu-li" @click="showRooms">Комнаты</li>
        </ul>
    </div>
</template>

<script>
    export default {
        mounted(){
            this.showProfile();
        },
        methods:{
            showProfile(){
                let toShow = $('#showProfile');
                let toHide = $('#showRooms');
                toShow.css({'display':'block'});
                toHide.css({'display':'none'});

                let links = $('.left-menu-li');
                links.eq(0).addClass('left-menu-active');
                links.eq(1).removeClass('left-menu-active');
            },
            showRooms(){
                let toShow = $('#showRooms');
                let toHide = $('#showProfile');
                toShow.css({'display':'block'});
                toHide.css({'display':'none'});

                let links = $('.left-menu-li');
                links.eq(1).addClass('left-menu-active');
                links.eq(0).removeClass('left-menu-active');
            }
        }
    }
</script>
