
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { getConversationBySender } from './getters.js';
import { saveMessageSent } from './setters.js';

const app = express();
const server = createServer(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const userConnections = new Map();

export async function createWebSocketServer(server) {
    const wss = new WebSocketServer({server});

    wss.on('connection', async (ws,req) => {
        const userId = req.url.split('/')[1];

        userConnections.set(userId,ws);


        console.log(`User ${userId} connected.`)
        ws.send(JSON.stringify({message:"This is a message sent from the websocket server"}))
        //fetch message history either here or page.server.js
        // const convo =  getConversationBySender(userId)
        // for(const message of convo) {
          // console.log(message)
        // }
        ws.on('message',(data) => {
            // const {sender,receiver,content} = JSON.parse(data);
            let newData = JSON.parse(data)
            console.log("Message:",newData);
            // I should save the message in the db
            // saveMessageSent(sender,receiver,content)
            // .then(lastId => {
                // const message ={id:lastId,sender,receiver,content,timestamp: new Date()};
// 
                // const receiverWs = userConnections.get(receiver);
// 
                // if(receiverWs) {
                    // receiverWs.send(JSON.stringify({type: 'new_message', message}))
                // }
// 
            // }).catch(err => {
                // ws.send(JSON.stringify({type: 'error', message:'An error has occured'}));
                // console.error(err);
            // })
        });

    
        ws.on('close', () => {
            userConnections.delete(userId);
        })
    })
}

createViteServer({
  server: { middlewareMode: true }
}).then((vite) => {
  app.use(vite.middlewares);

  app.use(express.static(path.join(__dirname, 'public')));

  createWebSocketServer(server);

  server.listen(5173, () => {
    console.log('Development server running on port 5173');
  });
});