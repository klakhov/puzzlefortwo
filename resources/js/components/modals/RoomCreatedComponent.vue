<template>
    <div>
        <div class="modal fade" id="room-created-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-header modal-header-title">
                        получено подтверждение
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col modal-message" id="room-create-message"></div>
                        </div>
                        <div class="row justify-content-center">
                            <button class="col-4 modal-ok-button" @click="closeModal">Ок</button>
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
        methods:{
            closeModal(){
                $('#room-created-modal').modal('hide');
            },
            showModal(){
                $('#room-created-modal').modal('show');
            }
        }
    }
</script>
