let URL_SERVER_AUTH = "192.168.137.136:9090"


var uid = null

var socket_open = false
var origin_event = null;

function receiveMessage(event) {
    if (event.data == "Hello World") {
        console.log("received ", event)
        origin_event = event
    }
}

function sendToken(token) {
    console.log("sending token ", token)
    origin_event.source.postMessage(token, origin_event.origin);
}

window.addEventListener("message", receiveMessage, false);

function connect() {

    uid = document.getElementById('uid').value

    document.getElementById('connect').textContent = "Connecting...";

    let url = "http://" + URL_SERVER_AUTH + "/auth/tryConnect/" + uid
    let httpRequest = new XMLHttpRequest()

    httpRequest.onreadystatechange = (data) => {

        if (data.originalTarget.readyState != 3)
            return

        let token = JSON.parse(data.originalTarget.responseText).token
        openSocket(token)
    }

    httpRequest.open('GET', url)
    httpRequest.setRequestHeader('Content-Type', 'text/plain')
    httpRequest.send()
}

function openSocket(token) {

    if (socket_open == true)
        return

    let socket = new WebSocket("ws://" + URL_SERVER_AUTH + "/auth/connect/" + uid + "?token=" + token);
    socket.onopen = () => {
        console.log("Status: Connected");
    };

    socket.onmessage = (e) => {
        console.log("Server: " + e.data)
        res = JSON.parse(e.data)
        if (res.isAuthValid) {
            sendToken(res.token)
            window.close()
        }
    };

    socket_open = true;
}