<template>
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">

        <room-chat-ico :unread="this.hasUnread" :show-modal="this.showChat"/>

        <div class="modal fade" id="room-chat" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content r-chat-folder">
                    <div class="modal-header r-chat-header container">
                        <h5 class="modal-title col" id="exampleModalLabel">Room chat</h5>
                        <button type="button" class="r-c-mute col-auto mr-4" @click="mute">
                            <i class="material-icons mute" :class="{'mute-active':muted}">volume_off</i>
                        </button>
                        <button type="button" class="r-close-but col-auto" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body p-0">
                        <div class="r-chat-container pt-4 pb-4" id="chat-container">
                            <div class="container" v-if="!messages.length">
                                <div class="row justify-content-center">
                                    <div class="col-auto r-empty-log">
                                        Hey there is no messages yet. Say something
                                    </div>
                                </div>
                            </div>
                            <room-chat-message v-for="message in messages" :data="message" :key="message.id"
                            :belongs-to-user="message.belongsToUser"/>
                        </div>
                        <div class="r-chat-box container pt-4 pb-3 pl-4 pr-5">
                            <div class="row justify-content-around">
                                <textarea-autosize
                                    placeholder="Enter your message here"
                                    v-model="sendingMessage"
                                    rows="1"
                                    :min-height=45
                                    :max-height="350"
                                    class="col r-input"
                                    id="message"
                                />
                                <button class="col-auto" @click="sendMessage"
                                        :class="{'r-button-disabled':!sendingMessage, 'r-button':sendingMessage}">
                                    <i class="material-icons my-font">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <notifications group="group-chat-message-n" classes="chat-message-n" position="bottom left"></notifications>
    </div>
</template>

<script>
    import RoomChatMessage from "./RoomChatMessage";
    import RoomChatIco from "./RoomChatIco";
    export default {
        components:{
            RoomChatMessage,
            RoomChatIco
        },
        props:[
            'user'
        ],
        data:function(){
            return{
                room:null,
                sendingMessage:"",
                channel:null,
                messages:[],
                hasUnread: false,
                muted: false,
                chatShown: false,
            }
        },
        mounted() {
            let uid = $(location).attr('href').split('/').pop();
            let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            axios.get('/puzzle/info/room/'+uid+'?_token='+token)
                .then((response)=>{
                    this.room = response.data;
                    axios.get('/puzzle/chat/room/'+this.room.uid)
                        .then(response=>{
                            this.restoreMessages(response.data);
                            this.listenMessages();
                        });
                });

            $('#room-chat').on('shown.bs.modal',()=>{
                try{
                    let container = document.getElementById('chat-container');
                    let index = this.unreadMessageIndex();
                    let collection = $('#chat-container')[0].children;
                    container.scrollTop = collection[index].offsetTop - 10;
                }catch (e) {} //ошбика может быть из-за пустой коллекции тк сообщений нет, но это нормально
                this.readAllMessages();
                this.chatShown = true;
            });
            $('#room-chat').on('hidden.bs.modal',()=>{
                this.chatShown = false;
            });
            document.onkeyup = event => {
                if(event.key === 'Enter' && !this.chatShown){
                    this.showChat();
                }else if(event.key === 'Enter' && this.chatShown){
                    this.sendMessage();
                }
            }
        },

        updated(){
            if(!!this.messages){
                    let newMessage = this.messages[this.messages.length-1];
                    if(newMessage.belongsToUser){
                        let container = document.getElementById('chat-container');
                        container.scrollTop = container.scrollHeight;
                    }
            }
        },
        methods:{
            listenMessages(){
                this.channel = Echo.private('room.' + this.room.uid);
                this.channel.listen('.chat-room-message', (pushed) => {
                    let message = this.belongsToUser(pushed.message);
                    if(!message.belongsToUser){
                        this.messages.push(message);
                        if(!this.muted){
                            this.$notify({
                                group: 'group-chat-message-n',
                                title: 'You got a chat message',
                                text: pushed.message.user.name + ' sent a message in #room',
                                type: 'message-n',
                                duration: 4000,
                                max: 3,
                            });
                        }
                        this.hasUnread = true;
                    }
                });
            },
            sendMessage(){
                if(!!this.sendingMessage){
                    const message = {
                        user: this.user,
                        text: this.sendingMessage,
                        id: this.messageId(),
                        timestamp: this.messageTimeStamp(),
                        readBy:[this.user.id],
                    };
                    this.messages.push(this.belongsToUser(message));
                    this.sendingMessage = "";
                    axios.patch('/puzzle/chat/room',{
                       message: message,
                       uid: this.room.uid,
                    })
                }
            },

            messageId () {
                return '_' + Math.random().toString(36).substr(2, 9);
            },

            messageTimeStamp(){
                let date = new Date();
                let hours = !!Math.floor(date.getHours()/10) ? date.getHours().toString() : '0'+date.getHours().toString();
                let minutes = !!Math.floor(date.getMinutes()/10) ? date.getMinutes().toString() : '0'+date.getMinutes().toString();
                return hours+':'+minutes;
            },

            belongsToUser(message){
                message.belongsToUser  = message.user.name === this.user.name;
                return message;
            },

            restoreMessages(messages){
                if(!this.isEmpty(messages)){
                    messages = JSON.parse(messages);
                    messages.forEach(message=>{
                        message.belongsToUser  = message.user.name === this.user.name;
                    });
                    this.messages = messages;
                    this.unreadCheck();
                }else{
                    this.hasUnread = false;
                }
            },

            readAllMessages(){
                let hasRead = false;
                this.messages.forEach((message)=>{
                    if(!message.readBy.includes(this.user.id)) {
                        message.readBy.push(this.user.id);
                        hasRead = true;
                    }
                });
                if(hasRead){
                    axios.put('/puzzle/chat/room',{
                        uid:this.room.uid,
                        user_id: this.user.id,
                    })
                }
                this.hasUnread = false;
            },

            unreadCheck(){
                for(let i=0; i<this.messages.length; i++){
                    if(!this.messages[i].readBy.includes(this.user.id)) {
                        this.hasUnread = true;
                        return;
                    }
                }
                this.hasUnread = false;
            },

            showChat(){
                let chat = $('#room-chat');
                $('#message').focus();
                chat.modal('toggle');
            },
            mute(){
                this.muted = !this.muted;
            },
            unreadMessageIndex(){
                let lastRead;
                for (let index = this.messages.length - 1; index>=0; index--){
                    if(this.messages[index].readBy.includes(this.user.id)){
                        lastRead = index;
                        break;
                    }
                }
                if(lastRead === this.messages.length -1 )
                    return lastRead; // случай когда все сообщения прочитаны, вернем самое последнее
                return lastRead + 1; //случай когда есть непрочитанные, вернем первое НЕПРОЧИТАННОЕ
            },

            isEmpty(obj) {
                for (let key in obj) {
                    return false;
                }
                return true;
            },
        }
    }
</script>
