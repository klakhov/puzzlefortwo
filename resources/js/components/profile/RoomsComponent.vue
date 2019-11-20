<template>
    <div>
        <created-modal ref="createdModal"></created-modal>
        <wait-modal ref="waitModal"></wait-modal>
        <accept-modal ref="acceptModal"></accept-modal>
        <div id="showRooms">
            <div class="rooms-container">
                <ul id="room-menu">
                    <li class="room-menu-link" @click="showRooms">Список Комнат</li>
                    <li class="room-menu-link" @click="showCreate">Создать комнату</li>
                    <li class="room-menu-link" @click="showAcceptModal">Показать окно</li>
                </ul>

                <div id="room-list">
                    <div class="row room justify-content-between" v-for="room in rooms">
                        <div class="col-lg-2 room-nick">{{room.user_1}}</div>
                        <div class="col-lg-5 room-description">{{room.description}}</div>
                        <input type="hidden" :value="room.uid" name="room-id">
                        <button class="col-xl-3 room-join" v-if="room.belongsTo !== 'user'" @click="joinRoom">Присоединиться</button>
                        <button class="col-xl-3 room-join-inaccessible" v-else>Присоединиться</button>
                        <div class="col-xl-1 room-img">img-1</div>
                    </div>
                </div>
                <div id="room-create">
                    <form action="" class="row justify-content-center" style="width: 100%">
                        <div class="col room-create-header">Создайте свою комнату</div>
                        <div class="w-100"></div>
                        <input class="col room-create-description" type="text" name="description" value="" placeholder="Описание комнаты" maxlength="100"
                               required id="room-create-description" autocomplete="off">
                        <div class="w-100"></div>
                        <select class="col room-create-img" name="img-name" id="room-create-img" required>
                            <option value="img-1">img-1</option>
                            <option value="img-2">img-2</option>
                            <option value="img-3">img-3</option>
                        </select>
                        <div class="w-100"></div>
                        <button class="col-2 room-create-submit" type="button" name="button" id="room-create-submit" @click="createRoom">Создать</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import createdModal from '../modals/RoomCreatedComponent.vue'
    import waitModal from '../modals/RoomAcceptWaitComponent.vue'
    import acceptModal from '../modals/RoomAcceptComponent.vue'
    export default {
        props:[
            'user_info'
        ],
        data:function() {
            return {
                rooms:[]
            }
        },
        mounted(){
            console.log(this.$root.objects);
            this.showRooms();
            this.getRooms();
            this.listenNewRooms();

        },
        components: {
            'created-modal':createdModal,
            'wait-modal':waitModal,
            'accept-modal':acceptModal
        },
        methods:{
            showAcceptModal(){
                this.$refs.acceptModal.showModal();
            },
            showRooms(){
                let roomList = $("#room-list");
                let roomCreate = $("#room-create");
                let roomMenuLinks = $('.room-menu-link');

                roomList.css({'display':'block'});
                roomCreate.css({'display':'none'});
                roomMenuLinks.eq(0).addClass('room-menu-link-active');
                roomMenuLinks.eq(1).removeClass('room-menu-link-active');
            },
            showCreate(){
                let roomList = $("#room-list");
                let roomCreate = $("#room-create");
                let roomMenuLinks = $('.room-menu-link');

                roomList.css({'display':'none'});
                roomCreate.css({'display':'block'});
                roomMenuLinks.eq(1).addClass('room-menu-link-active');
                roomMenuLinks.eq(0).removeClass('room-menu-link-active');
            },

            createRoom(){
                let description = $("#room-create-description").val();
                let image = $("#room-create-img").val();
                axios.post('api/rooms',{
                    description:description,
                    image:image,
                    api_token:this.user_info.api_token
                    }
                ).then((response)=>{
                    //Trigger the modal window Placed in play.blade.php as <created-modal>
                    // (source components/modals/RoomCreatedComponent.vue)
                    console.log(response);
                    if(response.data ==='User has actual room'){
                        $('#room-create-message').text('Комната уже была создана!');
                    }else{
                        $('#room-create-message').text('Комната успешно создана!');
                        this.listenRoomAccept(response.data.uid);
                    }
                    this.$refs.createdModal.showModal();
                })
            },
            getRooms() {
                axios.get('api/rooms?api_token=' + this.user_info.api_token)
                    .then((response) => {
                        console.log(response);
                        this.rooms = this.validateRooms(response.data);
                    })
            },
            joinRoom(){
                let uid = event.target.previousElementSibling.value;
                axios.put('api/rooms',{
                    //api for initial room-accept event
                    api_token:this.user_info.api_token,
                    uid:uid
                }).then((response)=>{
                    this.$refs.waitModal.start(response.data, this.user_info);
                    //listen for definitive room-accept event
                    console.log('joinRoom message/listening on '+ response.data.uid);
                    this.listenRoomAccept(response.data.uid);
                    console.log(response.data);
                })
            },

            listenNewRooms(){
                let channel = Echo.channel('rooms');
                channel.listen('.new-room', (pushed)=>{
                    console.log(this.validateRoom(pushed.new_room));
                    this.rooms.push(this.validateRoom(pushed.new_room));
                });
            },
            listenRoomAccept(uid){
                let channel = Echo.channel('rooms');
                console.log('listening on='+uid);
                channel.listen('.'+uid, (pushed)=>{
                    if(pushed.type === 'initial'){
                        this.$refs.acceptModal.start(pushed.accepted_room, this.user_info);
                        console.log(pushed.accepted_room);
                    }else if(pushed.type === 'definitive'){
                        this.redirectToPlay(pushed.accepted_room.uid);
                    }
                });
            },
            redirectToPlay(uid){
                document.location.href=this.PREF_HOST + "puzzle/"+uid;
            },
            validateRooms(rooms){
                rooms.forEach(room => this.validateRoom(room));
                return rooms;
            },
            validateRoom(room){
                if(room.user_1 === this.user_info.name){
                    room.belongsTo = 'user'
                }else{
                    room.belongsTo = 'other'
                }
                return room;
            }
        }
    }
</script>
