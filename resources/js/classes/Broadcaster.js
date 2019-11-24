import Fragment from "./Fragment";
export default class Broadcaster {
    constructor(room, user,fragment){
        this.room = room;
        this.user = user;
        this.fragment = fragment;
    }

    broadcast(broadcastEvent, data){
        let channel = Echo.private('room.'+this.room.uid);
        channel.whisper(broadcastEvent,data);
    }
    broadcastFragmentMove(){
        let fragment={
          x:this.fragment.x,
          y:this.fragment.y,
          ind:this.fragment.ind,
          shouldConnect:this.fragment.shouldConnect,
          group:false,
        };
        this.broadcast('move', fragment);
    }
    broadcastGroupMove(){
        let group={
            x:this.fragment.x,
            y:this.fragment.y,
            ind:this.fragment.ind,
            shouldConnect:this.fragment.shouldConnect,
            group: true
        };
        this.broadcast('move', group);
    }
}
