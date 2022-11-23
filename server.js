const express = require('express');
const app = express();
const cors = require('cors');

const path = require("path"); // client
app.use(express.static(path.join(__dirname, "client"))); // client

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: ["http://localhost:8080", "http://localhost:8081", "http://localhost:3000"],
    credentials: true
};

app.use(cors(corsOptions));

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:8080", "http://localhost:8081", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res, next) => {
    res.render("index");
})

const server = app.listen(3000, function() {
    console.log('Server is working');
})

io.on("connection", (socket) => {
    socket.on("chat", (data) => {
        io.emit("chat", data);
        console.log(`server - char : ${data.id}, ${data.moimId}, ${data.name}, ${data.message}, ${data.createdAt}`)
    })
})