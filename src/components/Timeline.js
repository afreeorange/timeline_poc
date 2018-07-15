import React from 'react';
import {
	VictoryChart,
	VictoryScatter,
	VictoryAxis,
	VictoryBar,
  VictoryZoomContainer,
  VictoryClipContainer,
  VictoryTooltip,
  Circle,
} from 'victory';
import { subDays, getDate } from 'date-fns';

import Event from './Event';
import TooltipThumb from './Tooltip'


const flyoutStyle = {
  fill: "#fff",
  strokeWidth: 0,
  filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))"
}

const TickMark = ({x1, y1, x2, y2, tick, style, events}) => {
  return (<Circle cx={x1} cy={y1} r={3} style={{fill: "#fff"}}/>)
};

const AxisComponent = ({x1, y1, x2, y2, tick, style, events}) => {
  const mergeStyle = (newStyle) => Object.assign({}, style, newStyle);
  return (
    <g>
      <line x1={x1} x2={x2} y1={y1} y2={y2} style={mergeStyle({stroke: "#e6e6e6", strokeWidth: "19", strokeLinecap: "square"})}/>
      <line x1={x1} x2={x2} y1={y1} y2={y2} style={mergeStyle({stroke: "#fff", strokeWidth: "2"})}/>
    </g>
  );
};

function getTicks(startDate, windowSize) {
  const ticks = []
  for (let offset = 365; offset--; offset >= 0) {
    ticks.push(subDays(startDate, offset));
  }
  return ticks;
}

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartWidth: 0,
      zoomWindow: 30,
    }
  }

  componentDidMount() {
    this.setState({
      chartWidth: window.innerWidth
    });
    window.addEventListener('resize', this.updateDimensions.bind(this));
    // remove this on unmount
  }

  updateDimensions(event) {
    const newWidth = event.target.innerWidth;
    let zoomWindow = 10;
    if (newWidth >= 600 && newWidth < 1000) {
      zoomWindow = 20;
    } else if (newWidth > 1000) {
      zoomWindow = 30;
    }

    this.setState({
      chartWidth: newWidth,
      zoomWindow
    })
  }

  render() {
    const {events, rainData, startDate, activeDate, setDateActive} = this.props;
    const tickData = getTicks(startDate);

    return (
          <VictoryChart
              domain={{
                x: [subDays(startDate,365), startDate],
                y: [0, 1.25]
              }}
							responsive={false}
							width={this.state.chartWidth}
              containerComponent={
                <VictoryZoomContainer
                  zoomDimension="x"
                  allowZoom={false}
                  zoomDomain={{
                    x: [subDays(startDate, this.state.zoomWindow), startDate],
                    y: [0, 1.25]
                  }}
                  clipContainerComponent={<VictoryClipContainer clipPadding={{top: 10, right: 11, left: 11}}/>}
                />
               }
          >
              <VictoryAxis
                scale={{x: "time"}}
                tickComponent={<TickMark />}
                axisComponent={<AxisComponent />}
                tickValues={tickData}
                orientation="top"
                tickFormat={
                  (x) => {
                    const dayOfMonth = getDate(x);
                    if (dayOfMonth === 1 || dayOfMonth % 5 === 0) {
                      return x.toLocaleDateString('en-US', {month:  'numeric', day: 'numeric'}); //FIXME: real impl should get locale from context/store/prop
                    }
                  }
                }
                style={{
                  grid: {
                    stroke: "#e6e6e6",
                    strokeWidth: (t) => {
                      const dayOfMonth = getDate(t);
                      if (dayOfMonth === 1 || (dayOfMonth % 5 === 0 && dayOfMonth <= 25)) {
                        return 3;
                      } else {
                        return 1;
                      }
                    }
                  }
                }}
              />

              <VictoryScatter
                scale={{x: "time"}}
                data={events}
                dataComponent={<Event activeDate={activeDate}/>}
                labelComponent={<TooltipThumb flyoutStyle={flyoutStyle}/>}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onClick() {
                        // this is hideous
                        setDateActive(arguments[1].datum.x)
                      }
                    }
                  }
                ]}
              />
              <VictoryBar
                data={rainData}
                style={{
                  data: {
                    fill: "#2d64b3",
                    width: 10,
                  },
                }}
                cornerRadius={5}
                labelComponent={<VictoryTooltip flyoutStyle={flyoutStyle}/>}
              />
              <VictoryAxis
                dependentAxis
                domain={[0,1]}
                domainPadding={[0,2]}
                offsetX={50}
                standalone={false}
                maxDomain={1}
                label={"precip"}
                style={{
                  ticks: { display: "none" },
                  tickLabels: { display: "none" },
                  axis: { display: "none" },
                }}
              />
          </VictoryChart>
    );
  }
}


export default Timeline;
