function produceEvent() {
    const payload = {
        t: Date.now(),
        y: Math.random(),
    };
    socket.send(JSON.stringify(payload));
}

// setInterval(produceEvent, 1000);
window.addEventListener('click', produceEvent);
