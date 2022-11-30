const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});
const cors = require('cors');

const path = require("path"); // client
app.use(express.static(path.join(__dirname, "client"))); // client

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:8081", "http://52.78.104.79:8080"],
    credentials: true
};

app.use(cors(corsOptions));

app.get("/", (req, res, next) => {
    res.render("index");
})

// const server = app.listen(3000, function() {
//     console.log('Server is working');
// })

http.listen(3000);

io.on("connection", (socket) => {
    socket.on("chat", (data) => {
        io.emit("chat", data);
        console.log(`chat : ${data.id}, ${data.moimId}, ${data.name}, ${data.message}, ${data.createdAt}`)
    })
})