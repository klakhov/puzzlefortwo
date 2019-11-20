<template>
    <div class="container">
        <div class="field">
            <our-canvas></our-canvas>
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
