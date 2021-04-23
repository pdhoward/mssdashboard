
const {kafka,
       fetchStoreSample, 
       fetchTagSample, 
       fetchSubscribers} =  require('../controllers')
const {wss} =               require('../events')
const {kafkaproducer} =     require('../events')
const { g, b, gr, r, y } =  require('../console')

module.exports = detect = (router) => {
	router.use(async(req, res, next) => {
   

    const detectStream = (int) => {
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
          if (client.readyState === 1) {
              client.send(JSON.stringify([tag]))
          }
        });

        
      }, int)
    }
     
    res.status(200).redirect('/')

    // Function to start generating random product signals for x number of Venues
    randomStream(1000)   

    next()
  })  
}
