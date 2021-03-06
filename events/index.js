
////////////////////////////////////////////////////////////////
////////////////Register Events and Start Server //////////////
//////////////////////////////////////////////////////////////
const WebSocket =               require('ws')
const {kafka} =                 require('./kafka')
const {socketevents} =          require('./sockets')
const { g, b, gr, r, y } =      require('../console');

const wss = new WebSocket.Server({noServer: true });

const register = (socket, wss) => {    
  socketevents(socket, wss)   
}

wss.on("connection", (socket, req) => {
    register(socket, wss)
    console.log(gr(`Socket Connected with Client`))
    console.info("Total connected clients:", wss.clients.size);
})

const kafkaconsumer = () => {
  return new Promise(async (resolve, reject) => {
    let {consumer} = await kafka()   
    resolve(consumer) 
  })  
}

module.exports = {
      wss,    
      kafkaconsumer
    }