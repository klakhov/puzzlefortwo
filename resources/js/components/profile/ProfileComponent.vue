<template>
    <div id="showProfile">
        <div class="profile-container">
            <div class="container-fluid p-5 b-border">
                <div class="row">
                    <div class="col-4 container">
                        <div class="row">
                            <div class="col container">
                                <div class="row p-p-pallet pb-4">
                                    <div class="col-5">
                                        <img :src="this.user.avatars.main" alt="">
                                    </div>
                                    <div class="col container">
                                       <div class="row mb-2">
                                           <div class="col p-nick p-0 ml-1" v-text="this.user.name">
                                           </div>
                                       </div>
                                        <div class="row mb-2">
                                            <div class="col p-status p-0 ml-1" v-text="this.user.status"></div>
                                        </div>
                                        <div class="row mt-5">
                                            <a class="col p-link pt-1 pb-1" :href="/edit/+this.user.name">
                                                Редактировать
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col container">
                                <div class="row">
                                    <div class="col">
                                        Достижения
                                    </div>
                                </div>
                                <div class="row p-a-pallet">
                                    <div class="col pt-2 pb-2">
                                        <achievement/>
                                        <achievement/>
                                        <achievement/>
                                        <achievement/>
                                        <achievement/>
                                        <achievement/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 container pl-5 pr-5">
                        <div class="row justify-content-center">
                            <div class="col-auto">Последние События</div>
                        </div>
                        <div class="row">
                            <div class="col container pt-2 pb-2 p-e-pallet">
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                                <event/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 container">
                        <div class="row justify-content-center">
                            <div class="col-auto">
                                Список друзей
                            </div>
                        </div>
                        <div class="row p-f-pallet">
                            <div class="col container">
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                                <friend/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <search/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Achievement from "./Achievement";
    import Event from "./Event";
    import Friend from "./Friend";
    import Search from "./Search";
    export default {
        components:{
            Achievement,
            Event,
            Friend,
            Search
        },
        props: {
            user: {},
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
