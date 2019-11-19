<template>
    <div class="">
        <div class="nick">{{this.user_info.name}}</div>
    </div>
</template>

<script>
    //import Name from 'route'
    export default {
        props:[
            'user_info'
        ],
        data:function() {
            return {
                //var:val
            }
        },
        components: {
            //'tag-name':Name
        },
        mounted() {
        },
        methods:{
        }
    }
</script>
