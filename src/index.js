const { APP_PORT } = require('./config/config.default');
const ws = require("ws");
const { findIsOnline } = require('./middleware/chat.middleware');
const { createMessage } = require('./service/chat.service');


const app = require('./app');


const server =  app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})

const wss = new ws.Server({ server })

let id = 0;
let onLineList = [];
const clients = {};

wss.on('connection', (conn,req) => {
    id++;
    conn.id = id;
    let connName = req.url.split('?')[1];
    const userInfo = {
        userName: connName,
        socketId: id,
    }
    for(let i = 0 ; i<onLineList.length;i++) {
        if(userInfo.userName === onLineList[i].userName) {
            id--;
            return;
        }
    }
    onLineList.push(userInfo);
    clients[connName] = conn; 
    conn.on('message', async (message) => {
        const newData = message.toString('utf-8');
        console.log(newData);
       const [content, userName] = newData.split('/');
       const toUser = findIsOnline(onLineList, userName);
       const res = await createMessage(content, connName,userName);
       if(toUser) {
        clients[toUser.userName].send(`${content}-${connName}-${res.id}`);
   }
       
    })
    conn.on('close', () => {
        onLineList = onLineList.filter(item => {
            return item.socketId !== conn.id;
        })
        console.log('连接断开');
    })
    
})

