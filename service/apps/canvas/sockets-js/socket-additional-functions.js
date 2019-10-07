//массивчик для обмена координатами с сервером
fragmentPositions = [];


// будем использовать username который храниться в куках для идентификации того кто двигает
function findCookie (cookie)
{
  var results = document.cookie.match ( '(^|;) ?' + cookie + '=([^;]*)(;|$)');
  if (results)
    return (unescape(results[2]));
  else
    return null;
}
//  создаем массив позиций
function fragmentPositionsInitialize(index, x, y) {
  fragmentPositions[index] = {id:index, x:x, y:y, smooth:'no-smooth', client:0};
}

//изменяем массив координат нашего фрагмента
function sendNewFragmentPostion(id, x, y, smooth) {
  fragmentPositions[id].x = x;
  fragmentPositions[id].y = y;
  fragmentPositions[id].smooth = smooth;
  fragmentPositions[id].client = findCookie("login");
  let toSend = JSON.stringify(fragmentPositions);
  socket.send(toSend);
 }
