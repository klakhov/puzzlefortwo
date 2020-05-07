<template>
    <div>
        <div class="modal fade" id="room-wait-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true"
             data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-header modal-header-title">
                        ожидание ответа
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col modal-message" id="room-wait-message">Ожидание игрока user_1</div>
                        </div>
                        <div class="row">
                            <div class="col modal-message" id="room-wait-timer">Осталось:59</div>
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
        data: function () {
            return {
                timeLeft: 15,
                room: {},
                user_info: {}
            }
        },

        methods: {
            closeModal() {
                $('#room-wait-modal').modal('hide');

            },
            showModal() {
                $('#room-wait-modal').modal('show');
            },
            start(room, user) {
                this.room = room;
                this.user_info = user;
                $('#room-wait-message').text('Ожидание игрока ' + room.user_1);
                this.showModal();
                this.waitTimer();
            },
            waitTimer() {
                if (this.timeLeft >= 0) {
                    $('#room-wait-timer').text('Осталось: ' + this.timeLeft);
                    this.timeLeft--;
                    setTimeout(this.waitTimer, 1000);
                } else {
                    $('#room-wait-timer').text('Время вышло');
                    setTimeout(this.removeOutdatedRoom, 3000);
                    this.timeLeft = 15;
                }
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
