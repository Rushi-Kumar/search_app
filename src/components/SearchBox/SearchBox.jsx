import React from 'react'
import PropTypes from 'prop-types'
import "./SearchBox.css"
import Button from "components/Button/Button.jsx"


class SearchBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue : ""
    }
  }
  onChange = (e)=>{
    console.log("searchBox",e.target.value)
    this.setState({searchValue:e.target.value})
  }

  render () {
    return (
      <div style ={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <h1 style = {{color:"white",marginRight:"20px"}}>Find your recipe </h1>
        <input onChange = {this.onChange} className = "searchBox" style = {this.props.style}/>
        <Button disable = {this.props.disableSearch} onClick = {()=>{this.props.onSearch(this.state.searchValue)}}>Search</Button>
      </div>
    )
  }
}

export default SearchBox;
