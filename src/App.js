import React, { Component } from 'react';
import Timeline from './Timeline';
import './App.css';
import { subDays, format} from 'date-fns';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCloud, faCircle)



class App extends Component {
  render() {
    const dates = [];
    let event = {};
    const today = new Date();
    let displayDate = null;

    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
      displayDate = subDays(today, dayOffset);
      if (Math.random() >= .5) {
        event.iconName = Math.random() >= .5 ? "cloud" : "circle";
        event.tipDetails = (
          <div>
            <strong>{format(displayDate, "M/D")}</strong>
            <br />
            { event.iconName === "cloud" && <span> {Math.ceil(Math.random() * 100)}% cloud cover </span>}
          </div>
        );
      }
      dates.push({
        displayDate,
        event
      })
      event = {};
    }
    return (
      <div className="App">
        <Timeline dateRange={dates}/>
      </div>
    );
  }
}

export default App;
