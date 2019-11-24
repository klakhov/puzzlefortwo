<template>
    <div class="container">
        <div class="field">
            <our-canvas v-bind:room="this.room" v-bind:user_1="this.user_1" v-bind:user_2="this.user_2"></our-canvas>
        </div>
    </div>
</template>

<script>
    import user from './PuzzleUserComponent'
    import ourCanvas from './PuzzleCanvasComponent'
    export default {
        props:[
            'user_1',
            'user_2',
            'room'
        ],
        data:function() {
            return {
            }
        },
        components: {
            'user':user,
            'our-canvas':ourCanvas
        },
        mounted() {

        },
        methods:{

        }
    }
</script>
