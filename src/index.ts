import WebSocket,{WebSocketServer} from "ws";
import http from 'http'
//this is the code for websockets without using express
const server=http.createServer(function(request:any,response:any){
    console.log((new Date())+'receved request for'+request.url)
    response.end('hi there')

});

const wss=new WebSocketServer({server});

let usercount=0;
wss.on('connection',function connection(ws){
    ws.on('error',console.error);

    ws.on('message',function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        })
    })
    console.log('new user connected',++usercount);
   
    ws.send('Hello message from server');
})

server.listen(8080,function(){
    console.log('Server started on port 8080');
});