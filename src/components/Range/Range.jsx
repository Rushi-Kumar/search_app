import React from 'react'
import PropTypes from 'prop-types'

class Range extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      min:0,
      max:0
    }
  }

  onChange=async(type,e)=>{
    let state  = {}
    state[type] = parseInt(e.target.value||0)
    await this.setState({...state})
    this.props.onChange({...this.state})
  }

  render () {
    return (
      <div style = {{display:"flex",justifyContent:"center",alignItems:"center",marginRight:"20px",marginLeft:"20px"}}>
        <p style={{color:"white",marginRight:"10px"}}>{this.props.label} -</p>
        <label style = {{color:"white",marginRight:"5px"}}>Min</label>
        <input onChange = {(e)=>{this.onChange("min",e)}} style = {{padding:"5px",marginRight:"5px",width:"50px"}} type ="number" min = {0} />
        <label style = {{color:"white",marginRight:"5px"}}>Max</label>
        <input onChange = {(e)=>{this.onChange("max",e)}} style = {{padding:"5px",marginRight:"5px",width:"50px"}} type ="number" min = {0} />
      </div>
    )
  }
}

export default Range;
