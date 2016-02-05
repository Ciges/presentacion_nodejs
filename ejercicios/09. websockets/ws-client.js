var ws = new WebSocket("ws://localhost:9000");

ws.onopen = function() {
	setTitle("Connectado al servidor de chat");
};

ws.onclose = function() {
	setTitle("DESCONECTADO");
};

ws.onmessage = function(payload) {
	printMessage(payload.data);
};

document.forms[0].onsubmit = function () {
    var input = document.getElementById('message');
    ws.send(input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector('h1').innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement('p');
    p.innerText = message;
    document.querySelector('div.messages').appendChild(p);
}
