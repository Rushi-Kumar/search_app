import React from 'react'
import PropTypes from 'prop-types'
import "./Button.css"


class Button extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return <button
              disabled={this.props.disable}
              onClick={this.props.onClick}
              className = {this.props.disable?"DisabledButton":"Button"}
           >
            {this.props.children}
          </button>
  }
}

export default Button;
