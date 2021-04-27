import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'
import DashboardActions from './DashboardActions'
import SubscriptionsHistory from './SubscriptionsHistory'
import KeyNumbers from './KeyNumbers'
import SubscriptionsRecent from './SubscriptionsRecent'
import SubscriptionsBreakdown from './SubscriptionsBreakdown'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const socket = new W3CWebSocket('ws://127.0.0.1:5000');

const Dashboard = () => {
  const [userName, setUserName] = useState("MSS")
  const [message, setMessage] = useState("")
  const [product, setProduct] = useState([{}])

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    socket.onmessage = (message) => { 
      let data = JSON.parse(message.data)
      if (data[0].type == 'tag') setProduct([...product, ...data])     
    };
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
        <SubscriptionsRecent messages={products} />
        <SubscriptionsBreakdown />
      </Grid>
    </BasePageContainer>
  )
}

export default Dashboard
