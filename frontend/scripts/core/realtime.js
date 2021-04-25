const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', function (event) {
    let payload = event.data;
    payload = JSON.parse(payload);
    console.log(payload);
    window.records.push(payload);
    renderChart(window.label, window.records);
});

socket.addEventListener('close', function (event) {
    console.log('websocket server closed');
    // location.reload();
});

socket.addEventListener('error', function (event) {
    console.log('websocket server has an error');
    // location.reload();
});
