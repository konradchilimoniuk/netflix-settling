import React from 'react'
import { connect } from 'react-redux';

import AnimateMount from '../../Objects/AnimateMount'
import Notification from './Notification'

const NotificationGroup = props => {
    return (
        props.notifications.length > 0 ? 
        <div id="notification-group">
            {
                props.notifications.map(notification => (
                    <AnimateMount shouldMount={notification.isVisible} key={notification.id}>
                        <Notification notification={notification} />
                    </AnimateMount>
                ))
            }
        </div>
        : null
    );
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(NotificationGroup);