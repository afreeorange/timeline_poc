import React from 'react';
import styled from 'styled-components'
import Timeline from '../containers/TimelineContainer'
import CHIMap from '../containers/CHIContainer'


const Layout = styled.section`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  grid-template-rows: [top] 70vh [v-divider] 30vh [bottom];
  grid-template-columns: [left] 100vw [right];
  grid-template-areas: "map" "timeline";
`

const TimelineWrapper = styled.div`
  grid-area: timeline;
	background: #f9f9f9;
`

const CHIWrapper = styled.div`
  grid-area: "map";
	background: #222;
`


const shell = () => {
  return (
    <Layout>
      <CHIWrapper>
        <CHIMap />
      </CHIWrapper>
      <TimelineWrapper>
      	<Timeline />
      </TimelineWrapper>
    </Layout>
  )
}

export default shell;
