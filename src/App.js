import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCloud } from '@fortawesome/free-solid-svg-icons'

import Shell from './views/Shell'

library.add(faCircle, faCloud);


class App extends Component {
  render() {
    return (
      <Shell></Shell>
    );
  }
}

export default App;
