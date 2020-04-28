import React from 'react';

import MenuBar from './Components/MenuBar'
import SettleApp from './Components/Settle App/SettleApp'
import FormOverlay from './Components/Forms/FormOverlay'
import FileLoader from './Components/FileLoader'
import NotificationGroup from './Components/Notifications/NotificationGroup';
import { connect } from 'react-redux';

class App extends React.Component {
  handleFormToggle = (form) => {
    setTimeout(() => this.setState({activeForm: form}), 300);
  }

  render() {
    return (
      <React.Fragment>
        <MenuBar isInitialized={this.props.isInitialized} />

        {!this.props.isInitialized && <FileLoader />}
        {this.props.isInitialized && <SettleApp />}
        {this.props.isInitialized && <FormOverlay handleFormToggle={this.handleFormToggle}/>}

        <NotificationGroup />
      </React.Fragment>
      );
  }
}

const mapStateToProps = state => {
  return {
    isInitialized: state.isInitialized
  }
}

export default connect(mapStateToProps)(App);
