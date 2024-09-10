
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
        const senderId = userId.split(',')[0];
        const receiver = userId.split(',')[1];

        userConnections.set(senderId,ws);


        console.log(`User ${userId} connected.`)
        const convo =  getConversationBySender(senderId,receiver)
        for(const message of convo) {
          ws.send(JSON.stringify({message:message}))
        }
        ws.on('message',(data) => {
            const {sender,receiver,content} = JSON.parse(data);
            let newData = JSON.parse(data)
            // I should save the message in the db
            const saved = saveMessageSent(sender,receiver,content)
            if(saved.changes > 0) {
                const message ={SenderId:sender,RecipientId:receiver,Content:content,DateCreated: new Date()};
                console.log(message.DateCreated)
                const receiverWs = userConnections.get(String(receiver));

                if(receiverWs) {
                    receiverWs.send(JSON.stringify({message:message}))
                }

            } else {
                console.log("Error saving message")
                ws.send(JSON.stringify({type: 'error', message:'An error has occured'}));
            }
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