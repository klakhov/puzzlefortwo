
async function initializeSockets(puzzleworker){
    let uid = $(location).attr('href').split('/').pop();
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let response = await axios.get('/puzzle/info/'+uid+'?_token='+token+'&uid='+uid);
    let room = response.data;
    let channel = Echo.private('room.' + room.uid);
    channel.listen('.client-move', (response) => {
        console.log(response);
        puzzleworker.push(response);
        puzzleworker.execute(arr);
    });
    return room;
}

function formExecutableTask(fragment) {
    return  {
        ind:fragment.ind,
        x:fragment.x,
        y:fragment.y,
        group:!!fragment.group,
        shouldConnect:shouldConnect,
        onBottomPanel:fragment.onBottomPanel,
    };
}
