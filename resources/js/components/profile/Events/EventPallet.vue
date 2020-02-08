<template>
    <div class="col-4 container pl-5 pr-5">
        <div class="row justify-content-center">
            <div class="col-auto p-title">Последние События</div>
        </div>
        <div class="row" >
            <div v-if="this.haveEvents && this.isMyProfile" class="col container pt-2 pb-2 p-e-pallet p-pallet">
                <div v-for="event in this.events">
                    <friend-event v-if="event.type === 'friend_request'"
                                  :options="event.options" :date="event.created_at"
                                  :key="event.id"
                                    v-on:refresh-profile="refreshProfile"/>
                </div>
            </div>
            <div v-else-if="!this.isMyProfile" class="col container pt-2 pb-2 p-e-pallet p-pallet">
                <div class="container p-event-alert mr-2 ml-2 p-2 mb-2">
                    <div class="row justify-content-center">
                        <div class="col-auto text-center">
                            Вы не можете просматривать события других игроков
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mt-3">
                    <button class="col-auto color-button" @click="returnBack">
                        Вернуться назад
                    </button>
                </div>
            </div>
            <div v-else class="col container pt-2 pb-2 p-e-pallet p-pallet">
                <div class="container p-event-alert mr-2 ml-2 p-2 mb-2">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            Событий не происходило
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FriendEvent from "./FriendEvent";
    export default {
        props:{
          profileEvents:{},
          haveEvents:{},
          isMe:{},
        },
        data() {
            return {
                isMyProfile: this.isMe,
                events: this.profileEvents,
            }
        },
        components:{
            FriendEvent
        },
        mounted() {
            console.log('events',this.events);
        },
        updated(){
            console.log('events',this.events);
        },
        methods: {
            returnBack() {
                this.$emit('return-back');
            },
            refreshProfile(){
                this.$emit('refresh-profile');
            }
        },
        watch:{
            isMe: function(newVal){
                this.isMyProfile = newVal;
            },
            profileEvents:function (newVal) {
                this.events = newVal;
            }
        }
    }
</script>
