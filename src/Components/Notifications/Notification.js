import React from 'react'
import { connect } from 'react-redux'
import { hideNotification } from '../../Data/Actions'
import Translate from '../../Languages/Translate'

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
    }
    
    componentDidMount() {
        this.timer = setTimeout(() => this.props.hideNotification(this.props.notification.id), 5000);
    }

    componentDidUpdate() {
        if(this.timer !== null)
            clearTimeout(this.timer);

        this.timer = setTimeout(() => this.props.hideNotification(this.props.notification.id), 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    //<Translate text="error" />: 
    render() {
        return (
            <div className={"notification " + (this.props.notification.type !== null ? this.props.notification.type : "")}>
                <Translate text={this.props.notification.message} />
                <div className="close" onClick={() => this.props.hideNotification(this.props.notification.id)} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideNotification: id => dispatch(hideNotification(id))
    };
}

export default connect(null, mapDispatchToProps)(Notification);