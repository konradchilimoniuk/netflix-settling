import React from 'react';

import Summary from './Summary'
import DetailedReturns from './DetailedReturns'

class SettleApp extends React.Component {
  render() {
    return (
        <div id="content">
          <div className="wrapper">
            <Summary />
            <DetailedReturns />
          </div>
        </div>
      );
  }
}

export default SettleApp;
