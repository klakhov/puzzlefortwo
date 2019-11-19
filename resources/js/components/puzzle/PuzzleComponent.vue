<template>
    <div class="container">
        <div class="field">
            <div class="first-user">
                <user v-bind:user_info="this.user_1"></user>
            </div>
            <div class="our-canvas">
                <our-canvas></our-canvas>
            </div>
            <div class="second-user">
                <user v-bind:user_info="this.user_2"></user>
            </div>
        </div>
    </div>
</template>

<script>
    import user from './PuzzleUserComponent'
    import ourCanvas from './PuzzleCanvasComponent'
    export default {
        props:[
            'user_1',
            'user_2'
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
