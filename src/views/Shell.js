import React from 'react';
import styled from 'styled-components'
import Timeline from '../components/Timeline'
import { subDays, getDate } from 'date-fns';

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

const today = new Date('2018-07-12T08:00:00.000Z');

const eventData = [...Array(50).keys()].filter(() => Math.random() > .15).map(idx => {
	const datum = subDays(today, idx);
	const dateString = datum.toLocaleDateString('en-US', {month:  'numeric', day: 'numeric'});
	const cloudiness = Math.random();

  return {
    x: datum,
    y: 1.25,
    icon: cloudiness <= .3 ? 'cloud' : 'circle',
		label: `${dateString}\n ${Math.ceil(cloudiness * 100)}% cloud cover`,
  };
});

const rainData = [...Array(50).keys()].filter(() => Math.random() > .15).map(idx => {
  const datum = subDays(today, idx);
  const precip = Math.random();
  return {
    x: datum,
    y: precip,
    label: `${Math.ceil(precip*3)} inches`
  };
});


const shell = () => {
  return (
    <Layout>
      <TimelineWrapper>
      	<Timeline
      	  events={eventData}
      	  rainData={rainData}
      	  startDate={today}
      	  history={30}
      	/>
      </TimelineWrapper>
    </Layout>
  )
}

export default shell;
