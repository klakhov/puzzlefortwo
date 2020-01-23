<template>
    <div class="container mt-1 mb-3">
        <div class="row"
             :class="{'justify-content-start':!this.orientation,
             'justify-content-end':this.orientation}">
            <div class="col-auto" :class="{'order-1':!this.orientation,'order-2':this.orientation,}">
                ava 40x40
            </div>
            <div class="col-8 m-0 container mr-box" :class="{'order-2':!this.orientation,'order-1':this.orientation,}">
                <div class="row justify-content-between">
                    <div class="col-auto mr-name" v-text="this.user"
                         :class="{'order-1':!this.orientation,'order-2':this.orientation,}">
                    </div>
                    <div class="col-auto mr-time" v-text="this.timestamp"
                         :class="{'order-2':!this.orientation,'order-1':this.orientation,}">
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
            'orientation'//true - свое сообщение, false - чужое
        ],
        data() {
            return {
                user:null,
                text:null,
                timestamp:null,
            }
        },
        mounted() {
            this.user = this.data.user.name;
            this.text = this.data.text;
            this.timestamp = this.data.timestamp;
        },
    }
</script>
