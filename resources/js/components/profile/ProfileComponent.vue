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
                                        <div class="row mt-5" v-if="isMe">
                                            <a class="col p-link pt-1 pb-1" :href="/edit/+this.user.name">
                                                Редактировать
                                            </a>
                                        </div>
                                        <div class="row mt-5" v-else-if="!isFriended && !isRequested" @click="addFriend">
                                            <div class="col p-link pt-1 pb-1">
                                                Добавить в друзья
                                            </div>
                                        </div>
                                        <div class="row mt-5" v-else-if="isFriended" @click="refuseFriend">
                                            <div class="col p-link pt-1 pb-1">
                                                Удалить из друзей
                                            </div>
                                        </div>
                                        <div class="row mt-5" v-else-if="isRequested">
                                            <div class="col p-link pt-1 pb-1">
                                                Заявка в друзья отправлена
                                            </div>
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
                   <event-pallet :profile-events="this.profileEvents" :is-me="isMe" :have-events="haveEvents"
                   v-on:return-back="refreshUser" v-on:refresh-profile="refreshUser"/>
                    <div class="col-4 container">
                        <friend-pallet :friends="this.currentUser.friends" :have-friends="haveFriends"
                                       v-on:profile-switch="profileSwitch"/>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <search v-on:profile-switch="profileSwitch"/>
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
    export default {
        components:{
            Achievement,
            Search,
            EventPallet,
            FriendPallet
        },
        props: {
            user: {},
        },
        data() {
            return {
                currentUser: this.user,
                isMe: true,
                haveEvents: false,
                isFriended: false,
                haveFriends: false,
                isRequested: false,
                profileEvents: [],
            }
        },
        mounted(){
            this.haveEvents = !!this.currentUser.profile_events.length;
            this.haveFriends = !!this.currentUser.friends.length;
            if(this.haveEvents) this.profileEvents = this.user.profile_events.reverse();
            console.log(this.user);
        },
        methods:{
            profileSwitch(user){
                axios.get('/profile/friends/'+user.name)
                    .then(response=>{
                        //перезагружаем профиль с друзьями
                        this.currentUser = response.data;
                        this.isMe = this.user.name === this.currentUser.name;
                        this.haveFriends = !!this.currentUser.friends.length;
                        if(!this.isMe){
                            this.checkIfRequested(this.currentUser);
                            this.checkIfFriended(this.currentUser);
                        }else{
                            this.isRequested = false;
                            this.isFriended = false;
                        }
                    });
            },
            refreshUser(){
                axios.get('/profile/info/'+this.user.name)
                    .then(response=>{
                        console.log(this.currentUser);
                        this.currentUser = response.data;
                        this.isMe = this.user.name === this.currentUser.name;
                        this.haveFriends = !!this.currentUser.friends.length;
                        if(this.haveEvents) this.profileEvents = this.user.profile_events.reverse();
                    })
            },
            addFriend(){
                axios.post('/profile/friends',{
                    name:this.currentUser.name,
                }).then(response=>{
                    this.isRequested = true;
                })
            },
            refuseFriend(){
                axios.delete('/profile/friends/'+this.currentUser.name)
                    .then(response=>{
                        this.isRequested = false;
                        this.isFriended = false;
                    })
            },
            checkIfRequested(friend){
                for(let prop in this.user.requests_of_mine){
                    if(this.user.requests_of_mine[prop].name === friend.name) {
                        this.isRequested = true;
                        return true;
                    }
                }
                this.isRequested = false;
                return false;
            },
            checkIfFriended(friend){
                for(let prop in this.user.friends){
                    if(this.user.friends[prop].name === friend.name) {
                        this.isFriended = true;
                        return true;
                    }
                }
                this.isFriended = false;
                return false;
            }
        }
    }
</script>
