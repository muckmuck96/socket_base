const express = require("express");
const https = require("https");
const http = require("http");
const _ = require("lodash");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});
const PORT = '3000';
// Http use
const server = http.createServer(app);
const SOCKET_URI = `http://localhost:${PORT}`;
// Https use
/*
const server = https.createServer({
    key: fs.readFileSync('cert/key.pem', 'utf8'),
    cert: fs.readFileSync('cert/cert.pem', 'utf8'),
}, app);
const SOCKET_URI = `https://localhost:${PORT}`;
*/

const io = require("socket.io")(server, {origins: "*:*"});
// Local storage

// Handle socket income/outgoing
io.on('connection', (socket) => {
    console.log('Client connected.');
    // Socket handling

    // Disconnecting
    
    socket.on('disconnecting', () => {
        console.log('Client is disconnecting...');
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});
// Application logic
// HINT: wanna clone an array without ref? Use _.cloneDeep(array) : array;

// Start server
server.listen(PORT);
console.log(`Server is running on port ${PORT}`);