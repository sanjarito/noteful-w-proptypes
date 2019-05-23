import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'


export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }

  constructor (props) {
  super(props);
  this.state = {
    formErrors: {foldername: ''},
    foldernameValid: false,
    formValid: true
  }
  }

  static contextType = ApiContext;




  handleSubmit = e => {
    e.preventDefault()

    if (e.target['folder-name'].value) {
    console.log('we are inside the function')

    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  } else {
    console.log("input field must be filled")
    this.setState({formValid: false})
  }
}

  render() {

    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>

        <NotefulForm
        onSubmit={this.handleSubmit}



        >
          <div className='field'>
          {this.state.formValid === false &&
            <div className='error-message'>
            <span> You cannot leave this field empty </span>
            </div>
           }
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
        
      </section>
    )
  }
}
