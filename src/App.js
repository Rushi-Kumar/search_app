import React from 'react'
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import Dropdown from "components/Dropdown/Dropdown.jsx"
import SearchBox from "components/SearchBox/SearchBox.jsx"
import Result from "components/Result/Result.jsx"
import * as Options from "data/data.js"
import * as API from "api/api.js"
import Range from "components/Range/Range.jsx"

const filterTitles  = {
  health: "Health Options",
  mealType:"Meal Types",
  cuisineType : "Cusine Types",
  dishType: "Dish Types",
  diet: "Diet Types",
  calories: "Calories",
  time: "Time required to prepare"
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      payload :{ },
      lastSearch :[],
      searchTitle:"",
      fetchingResults:false,
      searchResult:{
        hits:[]
      },
      error:false,
      showPreviousSearches:false
    }
  }

  // toggle view of previous searches
  toggleShowPreviousSearches=(e)=>{
    let showPreviousSearches = e.target.checked
    this.setState({showPreviousSearches})
  }

  // store previous searches
  storeSearch = (searchResult)=>{
    let {lastSearch} = this.state
    if(lastSearch.length === 5){
      lastSearch.shift()
    }
    lastSearch.push(searchResult)
  }

  // manages filters options
  onChange = (type, option)=>{
    let {payload} = this.state
    if(option ==="none"){
      if(payload.hasOwnProperty(type)){ delete payload[type] }
    }else{
      payload[type] = option
      console.log(type,option,payload)
    }
    this.setState({payload})
  }

  onRangeChange = (type,{min,max})=>{
    let {payload} = this.state
    if(min!==0 && max!==0){
      payload[type]=`${min}-${max}`
    }else if(min!==0){
      payload[type]=`${min}%2B`
    }else if(max!==0){
      payload[type]=`${max}`
    }else if(min===0 && max===0){
      delete payload[type]
    }
    this.setState({payload})

    console.log({type,min,max})
  }
  // prepares search title by taking filters and search value
  prepareSearchTitle =(payload)=>{
    // let {payload} = this.state
    let searchTitle =`Your Search Results for "${payload.q}"`
    delete payload.q
    let filterPart = ""
    let filters = Object.keys(payload)
    filters.forEach((key, i) => {
      filterPart = `${filterPart}, ${filterTitles[key]} as ${payload[key]}`
    });
    return filters.length===0?searchTitle : `${searchTitle} with filters ${filterPart.substring(1,filterPart.length)}`
  }

  // handles onClick of search button
  onSearch = async(searchValue)=>{
    // storing last searched values in the array
    if(this.state.searchTitle!==""){
      let searchTitle = this.state.searchTitle.replace("Your Search Results","You searched")
      this.storeSearch({searchTitle,searchResult:this.state.searchResult})
    }
    let {payload} = this.state
    payload.q = searchValue // assign searchvalue to "q" key, as it has to be sent as q in query parameters
    await this.setState({payload}) // store the paylaod for last search
    try {
      await this.setState({fetchingResults:true,searchTitle:"Please wait while fetch the results ...",searchResult:{ hits:[] }})
      let searchResult = await API.getSearchResult(this.state.payload)
      let searchTitle = this.prepareSearchTitle({...this.state.payload})
      await this.setState({fetchingResults:false,error:false,searchTitle,searchResult})
    }catch(err){
      console.log(err)
      await this.setState({searchTitle:this.prepareSearchTitle({...this.state.payload}),errMessage:err.message,error:true,fetchingResults:false})
    }
  }

  render () {
    return (
      <div className="App">
        <div style={{position:'sticky',width:"100%", top:0,backgroundImage: "linear-gradient(to right top, #2b2a2e, #292935, #25283c, #1c2844, #08284c)"}}>
          <div className = "searchSection">
            <SearchBox disableSearch = {this.state.fetchingResults} onSearch = {this.onSearch} style = {{width:"500px",height:"40px",borderRadius:"5px"}}/>
          </div>
          <div className ="optionSection">
            <Dropdown label = "Health Options" labelStyle = {{color:"white"}}
              onChange = {(option)=>{this.onChange("health",option)}} options = {Options.healthOptions||[]}/>
            <Dropdown label = "Meal Type" labelStyle = {{color:"white"}}
              onChange = {(option)=>{this.onChange("mealType",option)}} options = {Options.mealOptions||[]}/>
            <Dropdown label = "Cusine Type" labelStyle = {{color:"white"}}
              onChange = {(option)=>{this.onChange("cuisineType",option)}} options = {Options.cusineOptions||[]}/>
            <Dropdown label = "Dish Type" labelStyle = {{color:"white"}}
              onChange = {(option)=>{this.onChange("dishType",option)}} options = {Options.dishOptions}/>
            <Dropdown label = "Diet Options" labelStyle = {{color:"white"}}
              onChange = {(option)=>{this.onChange("diet",option)}} options = {Options.dietOptions}/>
          </div>
          <div className ="optionSection">
            <Range onChange = {(range)=>{this.onRangeChange("calories",range)}} label="Calories"/>
            <Range onChange = {(range)=>{this.onRangeChange("time",range)}} label="Time"/>
          </div>
          <div style ={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <div>
              {this.state.lastSearch.length !==0 &&
                (
                  <>
                    <input type="checkbox" checked = {this.state.showPreviousSearches}
                            onChange = {this.toggleShowPreviousSearches}
                    />
                  <label for="vehicle1" style={{color:"white"}}> View previous searches</label>
                  </>
                )
              }
              {this.state.showPreviousSearches&&this.state.lastSearch.map((f)=>{
                return <h3 style={{color:"white"}}>{f.searchTitle}</h3>
              })}
            </div>
            <h3 style={{color:"white"}}>{this.state.searchTitle}</h3>
          </div>
        </div>
        <div  className="resultSection">
          {
            this.state.error ? <div><h3 style={{color:"red"}}>{this.state.errMessage}</h3></div>: (
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",flexDirection:"column"}}>
                {
                  this.state.searchResult.hits.map((f,i)=>{
                    return <Result data ={f}/>
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default App;
