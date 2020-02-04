<template>
    <div class="container p-event mr-2 ml-2 p-2 mb-2">
        <div class="row justify-content-between pt-2" v-if="isWaiting && isReceived">
            <div class="col-auto p-t-event mt-1  pl-4" v-text="'Получен запрос в друзья от '+this.options.to">
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
        <div class="row justify-content-center" v-if="isClosed && isReceived">
            <div class="col-auto p-t-event pt-2 p-1" v-text="'Получен запрос в друзья от '+this.options.to">
            </div>
        </div>
        <div class="row justify-content-center" v-else-if="(isWaiting || isClosed) && isSent">
            <div class="col-auto p-t-event pt-2 p-1" v-text="'Отправлен запрос в друзья к '+this.options.to">
            </div>
        </div>
        <div class="row justify-content-center" v-else-if="isAccepted && isSent">
            <div class="col-auto p-t-event pt-2  p-1" v-text="'Запрос в друзья от '+this.options.to+' принят'">
            </div>
        </div>
        <div class="row justify-content-center" v-else-if="isAccepted && isReceived">
            <div class="col-auto p-t-event pt-2  p-1" v-text="'Ваш запрос в друзья к '+this.options.to+' принят'">
            </div>
        </div>
        <div class="row justify-content-center" v-else-if="isRefused && isSent">
            <div class="col-auto p-t-event  pt-2 p-1" v-text="'Запрос в друзья от '+this.options.to+' отклонен'">
            </div>
        </div>
        <div class="row justify-content-center" v-else-if="isRefused && isReceived">
            <div class="col-auto p-t-event pt-2  p-1" v-text="'Ваш запрос в друзья к '+this.options.to+' отклонен'">
            </div>
        </div>
        <div class="row justify-content-end">
            <div class="col-auto p-event-date" v-text="date"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            options:{},
            date:{}
        },
        data() {
            return {
                isWaiting: this.options.status === 'waiting',
                isAccepted: this.options.status === 'accepted',
                isRefused:this.options.status === 'refused',
                isClosed: this.options.status === 'closed',
                isReceived: this.options.mode === 'received',
                isSent: this.options.mode === 'sent',
            }
        },
        mounted() {
        },
        methods: {
            accept() {
                axios.patch('/profile/friends',{
                    name:this.options.to
                    }).then(response=>{
                        this.refreshProfile();
                })
            },
            refuse(){
                axios.delete('/profile/friends/'+this.options.to)
                    .then(response=>{
                        this.refreshProfile();
                    })
            },
            refreshProfile(){
                this.$emit('refresh-profile');
            }
        },
    }
</script>
