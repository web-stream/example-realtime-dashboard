
// Inny klient
function produceEvent() {
    const payload = {
        t: Date.now(),
        y: Math.random(),
    };
    socket.send(JSON.stringify(payload));
}

window.addEventListener('mousemove', _.debounce(produceEvent, 120));
// setInterval(produceEvent, 1000);
