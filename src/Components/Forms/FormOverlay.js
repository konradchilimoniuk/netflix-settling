import React from 'react'
import PersonForm from './PersonForm'
import ReturnForm from './ReturnForm'
import { connect } from 'react-redux';
import { toggleForm } from '../../Data/Actions';


/*

1. Tło rozmyc
2. Dodac duzy tytul: "Dodaj nowa osobe", "Dodaj nowy zwrot"
3. Tresc taka sama
4. Doprowadz do lewej
5. Ddoaj przycisk "Dodaj" tak, by nie przestawial zawartosci

*/


class FormOverlay extends React.Component {
    handleCloseForm = () => {
        this.props.toggleForm('', null);
    }

    render() {
        var forms = {
          addPerson: <PersonForm handleCloseForm={this.handleCloseForm} />,
          addReturn: <ReturnForm handleCloseForm={this.handleCloseForm} />
        }

        return (
            <div id="form-overlay" className={this.props.activeForm.form ? "active" : ""}>
                <div id="form">
                    {this.props.activeForm.form && forms[this.props.activeForm.form]}
                    <div className="close" onClick={this.handleCloseForm} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeForm: state.activeForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleForm: (form, options) => dispatch(toggleForm(form, options))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormOverlay);