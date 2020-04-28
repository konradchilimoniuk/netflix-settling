import React from 'react'
import { translations } from './Translations'
import { connect } from 'react-redux';

function Translate(props) {
  return (
    <React.Fragment>
      {translations[props.language.id][props.text]}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)(Translate);