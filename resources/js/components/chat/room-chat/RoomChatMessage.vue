<template>
    <div class="m-container container mt-1 mb-3">
        <div class="row"
             :class="{'justify-content-start':!this.belongsToUser,
             'justify-content-end':this.belongsToUser}">
            <div class="col-auto" :class="{'order-1':!this.belongsToUser,'order-2':this.belongsToUser,}">
                <img :src="this.user.avatars.sub" class="a-img" alt="">
            </div>
            <div class="col-8 m-0 container mr-box" :class="{'order-2':!this.belongsToUser,'order-1':this.belongsToUser,}">
                <div class="row justify-content-between">
                    <div class="col-auto mr-name" v-text="this.user.name"
                         :class="{'order-1':!this.belongsToUser,'order-2':this.belongsToUser,}">
                    </div>
                    <div class="col-auto mr-time" v-text="this.timestamp"
                         :class="{'order-2':!this.belongsToUser,'order-1':this.belongsToUser,}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-auto mr-text" v-text="this.text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:[
            'data',
            'belongsToUser'//true - свое сообщение, false - чужое
        ],
        data() {
            return {
                user:null,
                text:null,
                timestamp:null,
            }
        },
        mounted() {
            this.user = this.data.user;
            this.text = this.data.text;
            this.timestamp = this.data.timestamp;
        },
    }
</script>
