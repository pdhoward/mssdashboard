import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'
import DashboardActions from './DashboardActions'
import SubscriptionsHistory from './SubscriptionsHistory'
import KeyNumbers from './KeyNumbers'
import ProductsRecent from './ProductsRecent'
import Subscribers from './Subscribers'
import SubscriptionsBreakdown from './SubscriptionsBreakdown'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const socket = new W3CWebSocket('ws://127.0.0.1:5000');

const Dashboard = () => {
  const [userName, setUserName] = useState("MSS")
  const [message, setMessage] = useState("")
  const [product, setProduct] = useState([])
  const [subscriber, setSubscriber] = useState([])

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    socket.onmessage = (message) => { 
      let data = JSON.parse(message.data)
      let newArray = []
      let sliceArray = []
      // product sales state
      if (data[0].type == 'tag') {
        newArray = [...product, ...data]
        console.log(newArray)        
        if (newArray.length > 4) {
          sliceArray = newArray.slice(-4)
          setProduct(sliceArray)
        } else {
          setProduct(newArray)
        }      
      }
      // product sales state
      if (data[0].type == 'subscriber') {
        newArray = [...subscriber, ...data]
        console.log(newArray)        
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
        title={'Dashboard'}
        actionsComponent={DashboardActions}
      ></BasePageToolbar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SubscriptionsHistory />
        </Grid>
        <KeyNumbers />
        <ProductsRecent messages={product} />
        <Subscribers messages={subscriber} />
      </Grid>
    </BasePageContainer>
  )
}

export default Dashboard
