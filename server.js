const express = require('express');
const socketIO = require('socket.io');
const app = express();

const chatRouter = require('./routes/chat'); // client
const path = require("path"); // client
app.use(express.static(path.join(__dirname, "client"))); // client

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", chatRouter); // client

const server = app.listen(3000, function() {
    console.log('Server is working');
})

const io = socketIO(server);

io.on("connection", (socket) => {
    socket.on("chat", (data) => {
        io.emit("chat", data);
        console.log(`server - char : ${data.id}, ${data.moimId}, ${data.name}, ${data.message}, ${data.createdAt}`)
    })
})