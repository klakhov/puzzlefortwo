<template>
    <div class="container mb-2 p-3 p-friend" @click="profileSwitch">
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
    export default {
        props:{
            friend:{}
        },
        mounted() {
        },
        methods: {
            profileSwitch() {
                this.$emit('profile-switch',this.friend)
            }
        },
    }
</script>
