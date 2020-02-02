<template>
    <div class="profile-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-7 container p-5">
                    <form :action="'/edit/'+this.user.name" method="post" enctype="multipart/form-data">
                        <div class="row edit-pallet">
                            <div class="col-auto">
                                <img :src="this.avatar" alt="">
                                <div class="avatar-holder" @click="inputAvatar">
                                    <i class="material-icons md-light m-48">
                                        photo_camera
                                    </i>
                                </div>
                                <input type="file" id="avatar" name="avatar">
                            </div>
                            <div class="col container">
                                <div class="row">
                                    <div class="col p-nick p-0 ml-1" v-text="this.user.name"></div>
                                </div>
                                <div class="row">
                                    <input class="col p-status-edit p-0 ml-1 mt-3" placeholder="Ваш статус" name="status"
                                    :value="this.user.status">
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end">
                            <button class="col-auto color-button mr-3" type="submit">
                                Сохранить
                            </button>
                            <button class="col-auto empty-button">
                                Назад
                            </button>
                        </div>
                        <input type="hidden" name="_token" :value="csrf">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: {},
        },
        mounted() {
            this.avatar = this.user.avatars.main;
        },
        data() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                avatar: null
            }
        },
        methods: {
            inputAvatar() {
                $('#avatar').click();
            }
        },
    }
</script>
