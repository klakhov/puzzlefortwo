class Broadcaster {
    constructor(room){
        this.room = room;
    }

    broadcast(broadcastEvent, data){
        setTimeout(()=>{
            let channel = Echo.private('room.'+this.room.uid);
            channel.whisper(broadcastEvent,data);
        },100);
    }
}
