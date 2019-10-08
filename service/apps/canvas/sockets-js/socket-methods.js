function message(text) {
  console.log(text);
}

socket.onopen = function () {
  message("Connected to the server");
};
socket.onerror = function (error) {
  message("Error");
};
socket.onclose = function () {
  message("Connection closed");
};
socket.onmessage = function (event) {
  data = JSON.parse(event.data);
  if(data.client != findCookie("login")) {
    if(data.smooth == "no-smooth"){
      arr[data.id].move(data.x, data.y);
    }else if(data.smooth == "smooth"){
      arr[data.id].smoothMove(data.x, data.y);
    }
  }
};
