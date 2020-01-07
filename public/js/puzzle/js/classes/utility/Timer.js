class Timer {

    constructor(room, syncMark = 5){
        this.userToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        this.room = room;
        this.unixTime = 0;
        this.renderTime = "";
        this.syncMark = syncMark;
        this.syncTact = 0;
    }

    async watchTime(){
        //свериться с сервером
        let response = await this.synchronizeGameTime();
        this.unixTime = response.data;
        console.log(this.renderTime);
        //сверяемся каждые syncMark тактов (1 такт = 1 сек)
        setInterval(async ()=>{
            this.unixTime++;this.syncTact++;
            console.log(this.renderTime);
            if(this.syncTact>this.syncMark){
               this.syncTact = 0;
               let response = await this.synchronizeGameTime();
               this.unixTime = response.data;
            }
            this.renderTime = this.convertUNIX(this.unixTime);
        },1000);
    }

    //запросик на сервер возвращает unix марку прошедшего времени на сервере(низя доверять клиенту)
    synchronizeGameTime(){
      return axios.get('/puzzle/info/time/'+this.room.uid+'?_token='+this.userToken)
    }

    //конвертация unix в читаемое время, не спрашивайте как оно работает я и сам не знаю
    convertUNIX(time){
        let date = new Date(time*1000);
        let minutes = !!Math.floor(date.getMinutes()/10) ? date.getMinutes().toString() : '0'+date.getMinutes().toString();
        let seconds = !!Math.floor(date.getSeconds()/10) ? date.getSeconds().toString() : '0'+date.getSeconds().toString();
        return minutes+':'+seconds;
    }
}
