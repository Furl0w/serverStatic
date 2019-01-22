
let URL_SERVER = ""
function printFrame() {
    var popup = window.open(URL_SERVER+'/static/Html/popup.html', '', 'fullscreen=no')
    setTimeout(() => {
        console.log("sending message")
        popup.postMessage("Hello World", "*");
    }, 500)
}
function receiveMessage(event) {
    console.log(event.origin)
    // if (event.origin !== "http://localhost:5001")

    console.log("jwt: ", event.data)

    return event.data
}
window.addEventListener("message", receiveMessage, false);