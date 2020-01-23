<template>
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content r-chat-folder">
                    <div class="modal-header r-chat-header">
                        <h5 class="modal-title" id="exampleModalLabel">Room chat</h5>
                        <button type="button" class="r-close-but" data-dismiss="modal" aria-label="Close">
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
                            :orientation="message.orientation"/>
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
        <notifications group="group-chat-message-n" classes="chat-message-n" position="bottom right"></notifications>
    </div>
</template>

<script>
    import RoomChatMessage from "./RoomChatMessage";
    export default {
        components:{
            RoomChatMessage
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
            }
        },
        mounted() {
            let uid = $(location).attr('href').split('/').pop();
            let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            axios.get('/puzzle/info/room/'+uid+'?_token='+token)
                .then((response)=>{
                    this.room = response.data;
                    this.channel = Echo.private('room.' + this.room.uid);
                    this.listenMessages();
                });
        },
        updated(){
            if(!!this.messages){
                let newMessage = this.messages[this.messages.length-1];
                console.log(newMessage);
                if(newMessage.orientation){
                    let container = document.getElementById('chat-container');
                    container.scrollTop = container.scrollHeight;
                }
            }
        },
        methods:{
            listenMessages(){
                this.channel.listen('.client-room-message', (pushed) => {
                    this.messages.push(this.messageOrientation(pushed));
                    this.$notify({
                        group: 'group-chat-message-n',
                        title: 'You got a chat message',
                        text: pushed.user.name + 'sent a message in #room',
                        type: 'message-n',
                        duration: 4000,
                        max: 3,
                    });
                });
            },
            sendMessage(){
                if(this.sendingMessage){
                    const message = {
                        user: this.user,
                        text: this.sendingMessage,
                        id: this.messageId(),
                        timestamp: this.messageTimeStamp()
                    };
                    this.messages.push(this.messageOrientation(message));
                    this.channel.whisper('room-message',message);
                }
            },

            messageId () {
                return '_' + Math.random().toString(36).substr(2, 5);
            },

            messageTimeStamp(){
                let date = new Date();
                let hours = !!Math.floor(date.getHours()/10) ? date.getHours().toString() : '0'+date.getHours().toString();
                let minutes = !!Math.floor(date.getMinutes()/10) ? date.getMinutes().toString() : '0'+date.getMinutes().toString();
                return hours+':'+minutes;
            },

            messageOrientation(message){
                message.orientation  = message.user.name === this.user.name;
                return message;
            }
        }
    }
</script>
