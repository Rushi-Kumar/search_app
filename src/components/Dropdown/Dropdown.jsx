import React from 'react'
import PropTypes from 'prop-types'
import "./Dropdown.css"

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }



  render () {
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginRight:"5px",marginLeft:"5px"}}>
        <p style ={{marginRight:"10px",...this.props.labelStyle}}>{this.props.label}</p>
        <select onChange = {(e)=>{this.props.onChange(e.target.value)}} className = "dropdown">
          {
            this.props.options.map(({label,value},key)=>{
              return <option key = {key} value={value}>{label}</option>
            })
          }
        </select>
      </div>
    )
  }
}

export default Dropdown;
