<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>
                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import Name from 'route'
    export default {
        props:[
            //'data'
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
            console.log('Component mounted.')
        },
        methods:{
           alert(){
               alert('This is example component');
           }
        }
    }
</script>
