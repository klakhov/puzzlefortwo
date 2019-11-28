
export default class PuzzleWorker {

    constructor(){
        this.tasks = [];
        this.working = false;
        this.test = false;
        this.fragment = null;

    }
    push(task){
        if(!task.group){
            if(!task.shouldConnect){
                task.type = 'fragment_move';
                this.tasks.unshift(task);
            }else{
                task.type = 'fragment_move';
                this.tasks.unshift(task);
                let cloneTask = Object.assign({}, task);
                cloneTask.type = 'fragment_connect';
                this.tasks.unshift(cloneTask);
            }
        }else{
            if(!task.shouldConnect){
                task.type = 'group_move';
                this.tasks.unshift(task);
            }else{
                task.type = 'group_connect';
                this.tasks.unshift(task);
                let cloneTask = Object.assign({}, task);
                task.type = 'group_move';
                this.tasks.unshift(cloneTask);
            }
        }
    }
    execute(arr){
        if(this.tasks.length !== 0 && this.working === false){
            this.working = true;
            let task = this.tasks[this.tasks.length - 1];
            switch (task.type) {
                case 'fragment_move':{
                    let fragment = arr[task.ind];
                    console.log('moveing fr '+fragment.ind);
                    fragment.smoothMove(task.x, task.y);
                    break;
                }
                case 'fragment_connect':{
                    let fragment = arr[task.ind];
                    console.log('connecting fr '+fragment.ind);
                    fragment.connectToOther();
                    break;
                }
                case 'group_move':{
                    let fragment = arr[task.ind];
                    if(fragment.group == null){
                        let cloneTask = Object.assign({}, task);
                        cloneTask.type = 'fragment_connect';
                        this.tasks.push(cloneTask); //два потомушто один удалиться сразу воркером
                        this.tasks.push(cloneTask);
                    }else{
                        console.log('group move fr '+fragment.ind);
                        fragment.group.smoothMove(task.x, task.y, fragment);
                    }
                    break;
                }
                case 'group_connect':{
                    let fragment = arr[task.ind];
                    console.log('group connect fr '+fragment.ind);
                    fragment.group.connectTo();
                    break;
                }
            }
            let worker = this;
            setTimeout(function () {
                worker.tasks.pop();
                worker.working = false;
                worker.execute(arr);
            }, 300);
        }
    }
}
