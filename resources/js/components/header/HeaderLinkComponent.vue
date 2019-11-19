<template>
    <div class="row justify-content-center align-items-center toheight">
        <div class="col-3"></div>
        <div class="col-1">
            <a href="/" class="header-links">Главная</a>
        </div>
        <div class="col-1">
            <a href="/play" class="header-links">Пазлы</a>
        </div>
        <div class="col-1">
            <a href="/about" class="header-links">О нас</a>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log(location.href);
            let url = location.href;
            let aborted = "";
            let route = "";
            for (let i=url.length-1;i>0;i--){
                if(url[i]!=='/'){
                    aborted += url[i];
                }else {
                    break;
                }
            }
            for(let i=aborted.length-1;i>=0;i--){
                route += aborted[i];
            }
            let headerLinks = $('.header-links');
            switch (route) {
                case "":{
                    headerLinks[0].style.color='rgb(183,158,115)';
                    headerLinks[1].style.color='white';
                    headerLinks[2].style.color='white';
                    break;
                }
                case "about":{
                    headerLinks[0].style.color='white';
                    headerLinks[1].style.color='white';
                    headerLinks[2].style.color='rgb(183,158,115)';
                    break;
                }
                case "puzzle":{
                    headerLinks[0].style.color='white';
                    headerLinks[1].style.color='rgb(183,158,115)';
                    headerLinks[2].style.color='white';
                    break;
                }
                default:{
                    headerLinks[0].style.color='white';
                    headerLinks[1].style.color='white';
                    headerLinks[2].style.color='white';
                    break;
                }
            }
        },
        methods:{

        }
    }
</script>
