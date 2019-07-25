const WebSocket = require('ws');
const debug = require('debug');

debug.enable('*');

const console = {
    log: debug('websocket:log'),
    error: debug('websocket:error'),
};

const wss = new WebSocket.Server({
    port: 8080
});

const clients = [];
const data = [];

function sendMessage(msg) {
    clients.forEach((client) => {
        client.send(msg);
    });
}

function status() {
    return `(Clients, size=${clients.length})`;
}

wss.on('error', (...args) => {
    console.error(...args);
});

wss.on('connection', function connection(ws) {
    const id = clients.push(ws);
    console.log(`New Client, id=${id} ${status()}`);

    ws.on('message', (payload) => {
        console.log(payload);
        data.push(payload);
        sendMessage(payload);
    });

    ws.on('close', () => {
        const index = clients.indexOf(ws);
        console.log(`Remove Client, id=${index} ${status()}`);
        clients.splice(index, 1);
    });
});

console.log('WebSocket server started');
