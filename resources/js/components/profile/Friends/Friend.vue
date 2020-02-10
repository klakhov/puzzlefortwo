<template>
    <div class="container mb-2 p-3 p-friend" @click="switchProfile">
        <div class="row">
            <div class="col-auto">
                <img :src="friend.avatars.sub" alt="" class="a-img">
            </div>
            <div class="col container">
                <div class="row">
                    <div class="col a-title" v-text="friend.name">
                    </div>
                </div>
                <div class="row">
                    <div class="col a-desc" v-text="friend.status">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        props:{
            friend:{}
        },
        computed: {
            ...mapActions([
                'profileSwitch',
            ])
        },
        mounted() {
        },
        methods: {
            switchProfile(){
                this.$store.dispatch('profileSwitch',this.friend);
            }
        },
    }
</script>
