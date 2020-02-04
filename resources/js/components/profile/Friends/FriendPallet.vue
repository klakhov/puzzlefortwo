<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-auto">
                Список друзей
            </div>
        </div>
        <div class="row p-f-pallet" v-if="haveFriends">
            <div class="col container pt-2">
                <friend v-for="friend in this.friends"
                        :friend="friend" :key="friend.id"
                        v-on:profile-switch="profileSwitch"/>
            </div>
        </div>
        <div class="row p-f-pallet" v-else>
            <div class="col container pt-2">
                <div class="container p-event-alert mr-2 ml-2 p-2 mb-2">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            Список друзей пуст
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Friend from "./Friend";
    export default {
        props:{
            friends:{},
            haveFriends:{},
        },
        components:{
            Friend
        },
        data() {
            return {
                friends: this.props.friends
            }
        },
        mounted() {
        },
        methods: {
            profileSwitch($friend) {
                this.$emit('profile-switch',$friend);
            }
        },
        watch:{
            friends:function (newVal) {
                this.friends = newVal;
            }
        }
    }
</script>
