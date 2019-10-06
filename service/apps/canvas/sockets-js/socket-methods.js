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
  data.forEach(function (fragment) {
    if(fragment.smooth == 'no-smooth'){
      fragmentPositions[fragment.id].x = fragment.x;
      fragmentPositions[fragment.id].y = fragment.y;
      arr[fragment.id].move(fragment.x, fragment.y);
    }else if(fragment.smooth == 'smooth' && fragment.client != findCookie("login")){
      arr[fragment.id].smoothMove(fragment.x, fragment.y);
      fragmentPositions[fragment.id].x = fragment.x;
      fragmentPositions[fragment.id].y = fragment.y;
    }

  });
  message(data);
};
