<template>
    <div class="col-4 container pl-5 pr-5">
        <div class="row justify-content-center">
            <div class="col-auto p-title">Последние События</div>
        </div>
        <div class="row" >
            <div v-if="this.haveEvents && this.isMe" class="col container pt-2 pb-2 p-e-pallet p-pallet">
                <div v-for="event in this.profileEvents">
                    <friend-event v-if="event.type === 'friend_request'"
                                  :options="event.options" :date="event.created_at"
                                  :key="event.id"/>
                </div>
            </div>
            <div v-else-if="!this.isMe" class="col container pt-2 pb-2 p-e-pallet p-pallet">
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
    import {mapState} from 'vuex';
    export default {

        computed: {
            ...mapState([
                'profileEvents',
                'haveEvents',
                'isMe',
            ])
        },
        components:{
            FriendEvent
        },
        methods: {
            returnBack() {
                this.$store.dispatch('refreshUser');
            },
            refreshProfile(){
                this.$store.dispatch('refreshUser');
            }
        },
    }
</script>
