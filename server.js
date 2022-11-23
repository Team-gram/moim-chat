const express = require('express');
const socketIO = require('socket.io');
const app = express();
const cors = require('cors');

const chatRouter = require('./routes/chat'); // client
const path = require("path"); // client
app.use(express.static(path.join(__dirname, "client"))); // client

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const whitelist = ["http://localhost:8080", "http://localhost:8081", "http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback){
    const isWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
}
// const corsOptions = {
//     origin: ["http://localhost:8080", "http://localhost:8081", "http://localhost:3000"],
//     credentials: true
// };
app.use(cors(corsOptions));

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