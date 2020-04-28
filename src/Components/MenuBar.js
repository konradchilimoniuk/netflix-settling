import React from 'react'
import LanguageChooser from './LanguageChooser'
import Translate from '../Languages/Translate'
import { connect } from 'react-redux';
import { exit } from '../Data/Actions'

class MenuBar extends React.Component {
    saveData = e => {
        e.preventDefault();

        var json = JSON.stringify({
            subscriptionInfo: this.props.subscriptionInfo,
            people: this.props.people.items,
            returns: this.props.returns.items
        });

        var blob = new Blob([json], {type: "application/json"});
        var url  = URL.createObjectURL(blob);

        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "netflix-setttling-data.json";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }

    render() {
        return (
            <div id="menubar">
                <div className="wrapper">
                    <div id="title"><a href="/"><Translate text="title" /></a></div>
                    <div className="right">
                        {this.props.isInitialized ? <button className="menubar-button" onClick={this.saveData}><Translate text="saveButton" /></button>: null}
                        {this.props.isInitialized ? <button className="menubar-button" onClick={this.props.exit}><Translate text="exitButton" /></button>: null}
                        <LanguageChooser />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        subscriptionInfo: state.subscriptionInfo,
        people: state.people,
        returns: state.returns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        exit: () => dispatch(exit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);