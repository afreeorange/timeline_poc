import React from 'react';
import styled from 'styled-components';
import { getDate, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./tooltip.css"

const TimelineContainer = styled.section`
  display: grid;
  place-items: stretch;
  grid-template-columns: [left] minmax(min-content, 6em) [left-content-edge] 1em [left-controls-start] 2em [left-controls-stop] auto [right-controls-start] 2em [right-controls-stop right-content-edge] 1em [right];
  grid-template-rows: [top] 1em [topbar] auto [timeline-top] 1em [timeline-bottom] auto [bottom];
  height: 200px;
  background-color: #f9f9f9;
`;

const EventsBar = styled.div`
  grid-row: timeline-top / timeline-bottom;
  grid-column: left-content-edge / right;
  height: 1px;
  align-self: center;
  background-color: #f9f9f9;
`

const EventsContainer = styled.div`
  display: flex;
  overflow: auto;
  grid-column: left-content-edge / right-content-edge;
  grid-row: topbar / bottom;
  min-width: 0;
`

const EventsList = styled.ol`
  grid-column: left-content-edge / right-content-edge;
  grid-row: topbar / bottom;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: stretch;
  margin: 0;
  padding 0;
  width: 100%;
`;

const EventContainer = styled.li`
  list-style-type: none;
  height: 100%;
  display: flex;
  flex: 1 auto;
  align-items: center;
  justify-items: center;
  position: relative;
  min-width: 2em;

  /* using before psuedo element so we don't have to fiddle with z-index when rendering icons*/
  &::before {
    width: .30em;
    height: .30em;
    background: #f9f9f9;
    border-radius: .30em;
    position: absolute;
    content: "";
    transform: translateX(-50%);
  }
`;

const TimelineBar = styled.div`
  grid-row: timeline-top / timeline-bottom;
  grid-column: left-content-edge / right;
  background-color: #e6e6e6;
`

const EventLabel = styled.p`
  position: absolute;
  font-weight: 600;
  font-size: .85em;
  transform: translate(-50%, 2em);
  color: #808080;
`

const YearLabel = styled.p`
  grid-row: timeline-top/timeline-bottom;
  grid-column: left/left-content-edge;
  justify-self: end;
  align-self: center;
  margin: 0 1em;
  color: #808080;
  font-size: .85em;
`

const LeftSection = styled.div`
  grid-row: top/bottom;
  grid-column: left/left-content-edge;
  border-right: 1px solid #e6e6e6;
  background: #ffffff;
`

const ToolTip = styled.div`
  position: absolute;
  bottom: 150%
  background: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.1);
  display: none;
  padding: .5em;
  width: min-content;
  white-space: nowrap;
  font-size: .75em;
  color: #808080;
  transform: translateX(-11px);

  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }

`

function renderDateLabel(date) {
  const dayOfMonth = getDate(date);
  if (dayOfMonth === 1 || dayOfMonth % 5 === 0) {
    return <EventLabel>{format(date, "M/D")} </EventLabel>
  }
}

const Timeline = (props) => {
  return (
    <TimelineContainer>
      <LeftSection />
      <YearLabel>
        {format(props.dateRange[0].displayDate, 'YYYY')}
      </YearLabel>
      <TimelineBar />
      <EventsBar>
      </EventsBar>
      <EventsContainer>
        <EventsList>
          {props.dateRange.map((date, idx, elements) => {
            return (
              <EventContainer key={date.displayDate}>
                { renderDateLabel(date.displayDate) }
                { date.event && <div className="tooltip-parent"><FontAwesomeIcon
                  icon={date.event.iconName}
                  color="#f9f9f9"
                  style={
                    { strokeWidth: "50px",
                      stroke: "#2d64b3",
                      transform: "translateX(-50%)",
                      cursor: "pointer",
                      zIndex: elements.length - idx,
                    }
                  }>
                </FontAwesomeIcon>
                <ToolTip className="tooltip">
                  {date.event.tipDetails}
                </ToolTip>
                </div>
                }
              </EventContainer>
            )
            }
          )}
        </EventsList>
      </EventsContainer>
    </TimelineContainer>
  );
};

export default Timeline;
