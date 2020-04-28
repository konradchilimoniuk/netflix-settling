import React from 'react'
import { loadFileSuccess, loadFileError, startNew } from '../Data/Actions'
import { connect } from 'react-redux';
import Translate from '../Languages/Translate'

class FileLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inDragArea: false
        }
    
        this.dragDepth = 0;
    
        this.dragProps = {
            onDragEnter: this.handleDragEnter,
            onDragLeave: this.handleDragLeave,
            onDragOver: this.handleDragOver,
            onDrop: this.handleDrop
        }
    }

    handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragDepth++;
        
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({inDragArea: true});
        }
    }

    handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragDepth--;
        if(this.dragDepth > 0) return;
        
        this.setState({inDragArea: false});
    }

    handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        
    }

    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({inDragArea: false});
        
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            if(e.dataTransfer.items.length > 1)
                this.props.loadFileError("errorTooManyFiles");
            else
                this.handleFile(e.dataTransfer.files[0]);

            e.dataTransfer.clearData();
            this.dragDepth = 0;
        }
    }

    handleFile = file => {
        var reader = new FileReader();
        reader.onload = e => {
            this.parseFileResult(e.target.result);
        }
        reader.readAsText(file);
    }

    parseFileResult = data => {
        var parsedObject;
        try {
            parsedObject = JSON.parse(data);
        } catch (e) {
            this.props.loadFileError("errorWrongJSONFile");
            return;
        }

        if(this.isParsedObjectInvalid(parsedObject)) {
            this.props.loadFileError("errorWrongJSONStructure");
            return;
        }


        this.props.loadFileSuccess(parsedObject, "successFileLoaded");
    }

    handleStartApp = e => {
        e.preventDefault()
        this.props.startNew("successNewEditor");
    }

    isParsedObjectInvalid = object => {
        if(Object.keys(object).length > 3)
            return true;

        if(!object.hasOwnProperty("people") || !object.hasOwnProperty("returns") || !object.hasOwnProperty("subscriptionInfo"))
            return true;

        return false;
    }

    render() {
        return (
            <div id="file-loader">
                <div className="wrapper">
                    <div id="drop-area" {...this.dragProps} className={this.state.inDragArea ? "active" : ""}>
                        <input id="file-chooser-input" type="file" accept=".json" onChange={e => this.handleFile(e.target.files[0])} />
                        <label className="drag-area-button" htmlFor="file-chooser-input">
                            <Translate text="fileChooserDragAreaText" />
                        </label>
                        <div id="drag-area-overlay" className={this.state.inDragArea ? "active" : ""}>
                            <div className="drag-area-overlay-text">
                                <Translate text="fileChooserDragAreaOverlay" />
                            </div>
                        </div>
                    </div>
                    <div id="file-loader-start-new">
                        <div className="file-loader-text">
                            <Translate text="fileChooserStartDescription" />
                        </div>
                        <div className="file-loader-text">
                            <button onClick={this.handleStartApp}>
                                <Translate text="fileChooserStart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadFileSuccess: (data, message) => dispatch(loadFileSuccess(data, message)),
        loadFileError: message => dispatch(loadFileError(message)),
        startNew: message => dispatch(startNew(message))
    }
}

export default connect(null, mapDispatchToProps)(FileLoader);