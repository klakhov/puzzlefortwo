<template>
    <div class="container p-event mr-2 ml-2 p-2 mb-2">
        <div class="row justify-content-between">
            <div class="col-auto p-t-event mt-1" v-text="'Запрос в друзья от '+this.user.name">
            </div>
            <div class="col container">
                <div class="row justify-content-end">
                    <div class="col-auto pr-1">
                        <i class="material-icons p-i-event" @click="accept">
                            done
                        </i>
                    </div>
                    <div class="col-auto pr-3">
                        <i class="material-icons p-i-event" @click="refuse">
                            close
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            options: {},
            user:{}
        },
        mounted() {
        },
        methods: {
            accept() {
                axios.patch('/profile/friends',{
                    name:this.user.name
                }).then(response=>{
                    alert('friend matched!')
                })
            },
            refuse(){
                axios.delete('/profile/friends/'+this.user.name)
                    .then(response=>{
                        alert('friend destroyed!');
                })
            }
        },
    }
</script>
