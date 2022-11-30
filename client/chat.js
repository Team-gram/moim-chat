// const socket = io.connect("http://ec2-54-180-16-76.ap-northeast-2.compute.amazonaws.com:3000", {
//     cors: {origin: '*'}
// });
const socket = io("http://localhost:3000", {
    cors: {origin: '*'},
    transports: ['websocket']
});

const id = 1234567890; // cookie 활용
const moimId = 1;
const nickname = "minsu";
const chatList = document.querySelector(".chat_list");
const chat = document.querySelector(".chat_input");
const sendButton = document.querySelector(".send_btn");
const createdAt = "2000-01-01";

$(".send_btn").click(() => {
    const data = {
        id: id,
        moimId: moimId,
        name: nickname,
        message: chat.value,
        createdAt: createdAt
    }
    socket.emit("chat", data);
})

socket.on("connect", () => {
    console.log('connect')
})

socket.on("chat", (data) => {
    const li = document.createElement("li");
    li.innerText = `${data.name} : ${data.message}`;
    console.log(data);
    chatList.appendChild(li);
})

console.log(socket);