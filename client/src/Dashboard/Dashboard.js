import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'
import DashboardActions from './DashboardActions'
import Trends from './Trends'
import KeyNumbers from './KeyNumbers'
import ProductsRecent from './ProductsRecent'
import Subscribers from './Subscribers'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const socket = new W3CWebSocket('ws://127.0.0.1:5000');

let topStates = {}

let topBrands = {}


const subscriptionsItems = [
  { name: 'GitHub', ratio: 55.3, value: Math.round(55.3 * 144) },
  { name: 'MaterialUI', ratio: 25.7, value: Math.round(25.7 * 144) },
  { name: 'Google', ratio: 15.6, value: Math.round(15.6 * 144) },
  { name: 'ModularCode', ratio: 8.4, value: Math.round(8.4 * 144) },
  { name: 'GH', ratio: 5.5, value: Math.round(5.5 * 144) },
]

const brandCount = () => Object.entries(topBrands).sort((a, b) => b[1] - a[1])
const stateCount = () => Object.entries(topStates).sort((a, b) => b[1] - a[1])

let stateTrends = []
const genData = () => {

  let brandArray = brandCount()
  let labelset = brandArray.map(b => b[0])
  let dataset = brandArray.map(b => b[1])
  let stateArray = stateCount()
  let cnt = 0
   
  stateTrends = stateArray.map(s => {
                               cnt = cnt + s[1]
                               return s
                           })
                          .map((f, i) => {                            
                            let stateObj = {}                                                            
                            stateObj.state = f[0]
                            stateObj.value = f[1]
                            stateObj.ratio = ((f[1] / cnt) * 100).toFixed(2)
                            return stateObj                                                     
                          })
                          .filter((m, i) => i < 5)
  return {
  labels: labelset,
  datasets: [
    {
      label: 'Scale',
      data: dataset,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
}


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Dashboard = () => {
  const [userName, setUserName] = useState("MSS")
  const [message, setMessage] = useState("")
  const [product, setProduct] = useState([])
  const [subscriber, setSubscriber] = useState([])
  const [data, setData] = useState(genData());

  useEffect(() => {
    const interval = setInterval(() => setData(genData()), 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    socket.onmessage = (message) => { 
      let data = JSON.parse(message.data)
      let newArray = []
      let sliceArray = []
      let brandCount = 0
      // product sales state
      if (data[0].type == 'tag') {

        if (isNaN(topBrands[data[0].brand])) {
          topBrands[data[0].brand] = 1
        } else {
          topBrands[data[0].brand]++
        } 
        
        newArray = [...product, ...data]
            
        if (newArray.length > 4) {
          sliceArray = newArray.slice(-4)
          setProduct(sliceArray)
        } else {
          setProduct(newArray)
        }      
      }
      // subscriber state
      if (data[0].type == 'subscriber') {        
        if (isNaN(topStates[data[0].state])) {
          topStates[data[0].state] = 1
        } else {
          topStates[data[0].state]++
        } 

        newArray = [...subscriber, ...data]                
        if (newArray.length > 4) {
          sliceArray = newArray.slice(-4)
          setSubscriber(sliceArray)
        } else {
          setSubscriber(newArray)
        }      
      }
    }
  })

  return (
    <BasePageContainer>
      <BasePageToolbar
        title={'Dashboard Demonstrating Kafka Streaming Platform'}
        actionsComponent={DashboardActions}
      ></BasePageToolbar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Trends data={data} options={options} trends={stateTrends} />
        </Grid>
        <KeyNumbers />
        <ProductsRecent messages={product} />
        <Subscribers messages={subscriber} />
      </Grid>
    </BasePageContainer>
  )
}

export default Dashboard
