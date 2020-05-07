<template>
    <div>
        <div class="modal fade" id="room-accept-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
             data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-header modal-header-title">
                        получено подтверждение
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col modal-message-small" id="room-accept-message">К вашей комнате присоединился игрок user_2</div>
                        </div>
                        <div class="row">
                            <div class="col modal-message-small" id="room-accept-timer">Осталось:59</div>
                        </div>
                        <div class="row justify-content-center">
                            <button class="col-5 modal-ok-button" @click="acceptRoom">Приступить к игре</button>
                        </div>
                    </div>
                    <div class="modal-footer modal-footer-title">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                timeLeft:15,
                room:{},
                user_info:{},
            }
        },
        methods:{
            closeModal(){
                $('#room-accept-modal').modal('hide');
            },
            showModal(){
                $('#room-accept-modal').modal('show');
            },
            start(room,user){
                this.room = room;
                this.user_info = user;
                $('#room-accept-message').text('К вашей комнате присоединился игрок ' + room.user_2);
                this.showModal();
                this.waitTimer();
            },
            waitTimer(){
                if(this.timeLeft>=0){
                    $('#room-accept-timer').text('Осталось: '+this.timeLeft);
                    this.timeLeft--;
                    setTimeout(this.waitTimer, 1000);
                }else{
                    $('#room-accept-timer').text('Время вышло');
                    setTimeout(this.closeModal, 3000);
                    setTimeout(this.removeOutdatedRoom, 3000);
                    this.timeLeft = 15;
                }
            },
            acceptRoom(){
                axios.patch('api/rooms',{
                    api_token:this.user_info.api_token,
                    uid:this.room.uid
                }).then((response)=>{
                    console.log(response.data);
                })
            },
            removeOutdatedRoom() {
                axios.delete('api/rooms?api_token=' + this.user_info.api_token + "&uid=" + this.room.uid,)
                    .then(() => {
                        this.closeModal();
                    })
            }
        }
    }

</script>
