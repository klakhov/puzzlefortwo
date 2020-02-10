<template>
    <div id="showProfile">
        <div class="profile-container" v-if="this.initiated">
            <div class="container-fluid p-5 b-border profile-inner-container">
                <div class="row">
                    <div class="col-4 container">
                        <div class="row">
                            <div class="col container">
                                <div class="row p-p-pallet pb-4">
                                    <div class="col-5">
                                        <img :src="this.currentUser.avatars.main" alt="">
                                    </div>
                                    <div class="col container">
                                       <div class="row mb-2">
                                           <div class="col p-nick p-0 ml-1" v-text="this.currentUser.name">
                                           </div>
                                       </div>
                                        <div class="row mb-2">
                                            <div class="col p-status p-0 ml-1" v-text="this.currentUser.status"></div>
                                        </div>
                                        <div class="row justify-content-center mt-5" v-if="this.isMe">
                                            <a class="col-auto p-link pr-4 pl-4 pt-1 pb-1" :href="/edit/+this.user.name">
                                                Редактировать
                                            </a>
                                        </div>
                                        <div class="row mt-5 justify-content-center " v-else-if="!this.isFriended && !this.isRequested" @click="addFriend">
                                            <div class="col-auto p-link pt-1 pb-1">
                                                Добавить в друзья
                                            </div>
                                        </div>
                                        <div class="row mt-5 justify-content-center " v-else-if="this.isFriended" @click="refuseFriend">
                                            <div class="col-auto p-link pt-1 pb-1">
                                                Удалить из друзей
                                            </div>
                                        </div>
                                        <div class="row mt-5 justify-content-center " v-else-if="this.isRequested">
                                            <div class="col-auto p-link pt-1 pb-1">
                                                Заявка в друзья отправлена
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col container">
                                <div class="row justify-content-center">
                                    <div class="col-auto p-title">
                                        Достижения
                                    </div>
                                </div>
                                <div class="row p-a-pallet p-pallet">
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
                   <event-pallet/>
                    <div class="col-4 container">
                        <friend-pallet/>
                        <div class="container">
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
    </div>
</template>

<script>
    import Achievement from "./Achievements/Achievement";
    import FriendPallet from "./Friends/FriendPallet";
    import Search from "./utils/Search";
    import EventPallet from "./Events/EventPallet";
    import store from "./Store/Store";
    import {mapActions, mapState} from 'vuex';
    export default {
        store,
        components:{
            Achievement,
            Search,
            EventPallet,
            FriendPallet
        },
        props: {
            initialUser: {},
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapActions([
                'initProfile',
            ]),
            ...mapState([
                'user',
                'currentUser',
                'isMe',
                'haveEvents',
                'haveFriends',
                'isRequested',
                'isFriended',
                'profileEvents',
                'initiated'
            ])
        },
        mounted(){
            this.$store.dispatch('initProfile',this.initialUser.name);
        },
        methods:{
            addFriend(){
                axios.post('/profile/friends',{
                    name:this.currentUser.name,
                }).then(response=>{
                    this.$store.commit('setIsRequested',true)
                })
            },
            refuseFriend(){
                axios.delete('/profile/friends/'+this.currentUser.name)
                    .then(response=>{
                        this.$store.commit('setIsRequested',false);
                        this.$store.commit('setIsFriended',false);
                    })
            },
        }
    }
</script>
