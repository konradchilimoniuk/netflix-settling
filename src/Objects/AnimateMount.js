import React from 'react'

class AnimateMount extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            shouldAnimateMount: this.props.shouldMount
        }
    }

    componentDidUpdate(prevProps) {
        if(!this.props.shouldMount && prevProps.shouldMount) {
            setTimeout(() => this.setState({shouldAnimateMount: false}), 299);
        } else if(this.props.shouldMount && !prevProps.shouldMount) {
            this.setState({shouldAnimateMount: true});
        }
    }

    render() {
        return (
            this.state.shouldAnimateMount ?
            <div className={this.props.shouldMount ? "mount-animation" : "unmount-animation"}>
                {this.props.children}
            </div>
            : null
        )
    }
}

export default AnimateMount;