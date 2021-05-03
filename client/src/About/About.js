import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'

const About = () => {
  
  return (
    <BasePageContainer>
      <BasePageToolbar
        title={'MSS International: Cloud Migrations for the Real-time Enterprise'}     
      >
      </BasePageToolbar>
      <Grid container>
        <Grid item xs={12}>
          <iframe width="840" height="500" src="https://mssabout.netlify.app/" />;
        </Grid> 
      </Grid>     
  </BasePageContainer>
   
  )
}

About.propTypes = {}

export default About
