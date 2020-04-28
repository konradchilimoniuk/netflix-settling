import React from 'react'
import { languages } from '../Languages/Translations'
import { connect } from 'react-redux';
import { setLanguage } from '../Data/Actions';

class LanguageChooser extends React.Component {
    state = {
        isOpen: false
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = e => {
        if(!this.languageRef.contains(e.target))
            this.setState({isOpen: false});
    }

    handleLanguageChange = (e, language) => {
        e.preventDefault();
        this.props.setLanguage(language);
        this.toggleLanguageList();
    }

    toggleLanguageList = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div id="language-chooser" ref={ref => this.languageRef = ref}>
                <div id="language-chooser-current" onClick={this.toggleLanguageList}>
                    {this.props.language.text}
                </div>
                <div id="language-chooser-list" className={this.state.isOpen ? "opened" : ""}>
                    {languages.filter(language => language.id !== this.props.language.id)
                        .map(language => (
                        <div className="language-chooser-option" data-language={language.id} key={language.id} onClick={(e) => this.handleLanguageChange(e, language)}>
                            {language.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => dispatch(setLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageChooser);