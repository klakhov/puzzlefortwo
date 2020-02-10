<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-auto p-title">
                Список друзей
            </div>
        </div>
        <div class="row p-f-pallet p-pallet" v-if="this.haveFriends">
            <div class="col container pt-2">
                <friend v-for="friend in this.friends"
                        :friend="friend" :key="friend.id"
                        />
            </div>
        </div>
        <div class="row p-f-pallet p-pallet" v-else>
            <div class="col container pt-2">
                <div class="container p-event-alert mr-2 ml-2 p-2 mb-2">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            У Вас пока нет друзей
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Friend from "./Friend";
    import {mapState} from 'vuex';
    export default {
        components:{
            Friend
        },
        computed: {
            ...mapState([
                'currentUser',
                'haveFriends',
            ]),
            friends(){
                return this.currentUser.friends;
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
