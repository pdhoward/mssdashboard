///////////////////////////////////////////////////////////////
////////        Proxy Server ---  STREAMS              ///////
//////            mainline processing                 ///////
//////           c all rights reserved               ///////
///////////////////////////////////////////////////////////

const express =               require('express')
const cors =                  require('cors')
const { createServer } =      require('http')
const path =                  require('path')
const transport =             require('../config/gmail')
const { g, b, gr, r, y } =    require('../console');

const app = express()
const server = createServer(app)

const PORT = process.env.PORT || 5000;

////////////////////////////////////////
//////middleware and static routes/////
///////////////////////////////////////
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const isDev = (app.get('env') === 'development');
console.log('isDev: ' + isDev);

//////////////////////////////////////////////////////////////////
////////////  Event Registration for streams and db      ////////
////////////////////////////////////////////////////////////////

const {wss} = require('../events');

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request);
    });     
})

/////////////////////////////////////////
///// alerts for platform errors ///////
///////////////////////////////////////

const handleErr = (err) => {
  console.log('uncaught exception')
  console.log(err)
}

const mailObject = {
  from: process.env.TRANSPORT_LABEL,
  to: process.env.TRANSPORT_RECEIVER,
  subject: 'Platform Error',
  text: ''
}
process.on('uncaughtException', function (er) {
    console.log("uncaught exception")
    console.error(er.stack)
    mailObject.text = er.stack;
    transport.sendMail(mailObject, function (er) {
       if (er) console.error(er)
       process.exit(1)
    })
  })
 
 /////////////////////////////////////////////////
 ///// Register and Config Routes ///////////////
 ///////////////////////////////////////////////
 const about =       express.Router()
 const header =      express.Router() 
 //const signal =       express.Router({mergeParams: true}) 
 const test =        express.Router({mergeParams: true})

 const userRoutes = require('../routes/auth')

 require('../routes/about')(about)
 require('../routes/header')(header)
 //require('../routes/signal')(signal)
 require('../routes/test')(test)

///////////////////////////////////////////////////////////////
//////////  api routes - realtime signal processing  /////////
/////////////////////////////////////////////////////////////

app.use(header)
app.get('/about', about)

////////////////////////////////////////////////////////
//////////       api routes - streaming       /////////
//////////////////////////////////////////////////////

app.use("/api/auth", [userRoutes])

//app.use('/api/signals', [signal])

/////////////////////////////////////////////////////
//////////////   TESTING          //////////////////
///////////////////////////////////////////////////
const randomStream = (int) => {
  let id
  let x = 0
  id = setInterval(async function() {
      
    // // kafka consumer - 
    // try {
    //   let result = await kafka(producer, tag)          
    //   console.log(result, x)
    // } catch (e) {
    //   console.log(e)
    // }
         
    // MOCK
    let tag = {}
    x++
    tag.price = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
    tag.seq = x
    tag.name='MESSAGE'
    
    // sockets
    wss.clients.forEach((client) => {
      console.log(client.readyState)
      if (client.readyState === 1) {
          client.send(JSON.stringify([tag]))
      }
    })

    
  }, int)
}

randomStream(1000)   

///////////////////////////////////
///////     active servers ///////
/////////////////////////////////

server.listen(PORT, () => console.log(g(`Listening on Port ${PORT}`)))
