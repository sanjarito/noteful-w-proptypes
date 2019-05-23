import React, { Component } from 'react'
import './NotefulForm.css'
import PropTypes from 'prop-types';
import FormError from '../AddFolder/FormError'


class NotefulForm extends Component {


  render(){

    const { className, ...otherProps } = this.props

  return (
    <FormError>
    <form

      className={['Noteful-form', className].join(' ')}
      action='#'


      {...otherProps}
    />
    </FormError>
  )
  }
}

NotefulForm.propTypes = {
  onSubmit: PropTypes.func
};


export default NotefulForm
