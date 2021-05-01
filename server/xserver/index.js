///////////////////////////////////////////////////////////////
////////        KAFKA Consumer Server ---              ///////
//////            mainline processing                 ///////
//////           c all rights reserved               ///////
///////////////////////////////////////////////////////////

const express =                 require('express')
const cors =                    require('cors')
const { createServer } =        require('http')

const transport =               require('../config/gmail')
const { g } =                   require('../console');
const {brands} =                require('../data')
const app = express()
const server = createServer(app)

const PORT = process.env.PORT || 4000;

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
const {kafkaconsumer} = require('../events')

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

///////////////////////////////////////////////////
//////////////   STREAM         //////////////////
/////////////////////////////////////////////////
    const plans = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Basic']
    let x = 0
    let z = 2
    let consumer = {}

    const start = () => {
      return new Promise(async(resolve, reject) => {
        consumer = await kafkaconsumer() 
        resolve (consumer)
      })
    }
    const subscribe = (consumer) => {
      return new Promise((resolve, reject) => {     
        consumer.subscribe(["sales"]);        
        setInterval(function () {
          consumer.consume(1);
        }, 1000);    
   
       consumer.on("data", (data) => {        
          // you will start receiving message here once the producer successfully produces the message here
          const intoString = data.value.toString();
          const message = JSON.parse(intoString);         
        
          if (message[0].type =='tag') {
            x++
            let brand = brands[Math.floor(Math.random() * brands.length)]  
            message[0].unitsales = Math.floor(Math.random() * (1000 - 100) + 100);
            message[0].price = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
            message[0].seq = x
            message[0].brand = brand
          } else {
            z++
            message[0].seq = z
            message[0].name = `${message[0].firstName} ${message[0].lastName}`
            message[0].plan = plans[Math.floor(Math.random() * plans.length)]   
            message[0].location = `${message[0].city}, ${message[0].state}`
          }       
          // sockets
          wss.clients.forEach((client) => {      
            if (client.readyState === 1) {
                client.send(JSON.stringify(message))
            }
          })         
        })        
      })
    }

   const processnow = async() => {    
     let consumer = await start()     
     await subscribe(consumer)
   }
    
   processnow()
    
 /////////////////////////////////////////////////
 ///// Register and Config Routes ///////////////
 ///////////////////////////////////////////////
 const about =       express.Router()
 const header =      express.Router()  
 const test =        express.Router({mergeParams: true})

 const userRoutes = require('../routes/auth')

 require('../routes/about')(about)
 require('../routes/header')(header)
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


///////////////////////////////////
///////     active servers ///////
/////////////////////////////////

server.listen(PORT, () => console.log(g(`Listening on Port ${PORT}`)))
