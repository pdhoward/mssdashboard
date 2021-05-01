/**
 * Kafka producer - IBM Cloud
 */
 const Kafka = require("node-rdkafka");
 const { g, b, gr, r, y } =          require('../console');

 let kafka_brokers_sasl = [
   "broker-1-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
   "broker-0-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
   "broker-5-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
   "broker-4-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
   "broker-3-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
   "broker-2-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093"
 ]
 //basic connection configuration for producer

 let apikey = process.env.IBM_KAFKA_APIKEY
 
 exports.kafka = () => {
   return new Promise(async(resolve, reject)=> {
      const consumer = new Kafka.KafkaConsumer({
          "group.id": "kafka-testTopic",
          //"metadata.broker.list": "broker-0-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093", 
          "metadata.broker.list": kafka_brokers_sasl,
          "api.version.request": true,
          //"dr_cb": true, 
          "sasl.username":"token",
          "sasl.password": apikey,
          "security.protocol":"SASL_SSL",
          "sasl.mechanism":"PLAIN",  
          "broker.version.fallback": "0.10.0"
         }, {});

      consumer.on("ready", function () {
        console.log(b('Consumer Ready'))
        
      })     
   
      consumer.on("error", function (err) {
        console.log(r("err", err))
        });

      // initiate the consumer connection
      consumer.connect(null, function (err, metadata) {
        if (err) console.log(err)
        console.log(b("Consumer Connected"))
        resolve({consumer})
      });
    })
  }